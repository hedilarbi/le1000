import { describe, expect, it } from "vitest";

import { daySlots, occupancyAt, peakOccupancy, seatingMinutes, seatsLeft } from "./availability";
import { timeToMinutes } from "./time";
import type { ReservationSettings } from "./types";

const at = timeToMinutes;
const settings: ReservationSettings = {
  occupancyMinutes: 150,
  bufferMinutes: 30,
  lastSeatingBeforeCloseMinutes: 60,
  minOnlineLeadMinutes: 60,
  weeklyHours: Array.from({ length: 7 }, () => ({ open: true, opensAt: "11:00", closesAt: "23:00" })),
};
const duration = seatingMinutes(settings);

function booking(time: string, partySize: number) {
  return { start: at(time), end: at(time) + duration, partySize };
}

describe("seatingMinutes", () => {
  it("additionne l'occupation et la marge de sécurité (2h30 + 30 min = 3h)", () => {
    expect(duration).toBe(180);
  });
});

describe("occupation d'un lieu", () => {
  it("libère les places d'une réservation de 17h à 20h", () => {
    const bookings = [booking("17:00", 5)];
    expect(occupancyAt(bookings, at("16:45"))).toBe(0);
    expect(occupancyAt(bookings, at("17:00"))).toBe(5);
    expect(occupancyAt(bookings, at("19:45"))).toBe(5);
    expect(occupancyAt(bookings, at("20:00"))).toBe(0);
  });

  it("utilise le pic et non la somme des réservations qui chevauchent", () => {
    // A : 17h-20h, B : 20h-23h. Une demande à 18h chevauche les deux,
    // mais il n'y a jamais plus de 40 personnes en même temps.
    const bookings = [booking("17:00", 40), booking("20:00", 40)];
    expect(peakOccupancy(bookings, at("18:00"), at("18:00") + duration)).toBe(40);
    expect(seatsLeft(80, bookings, at("18:00"), duration)).toBe(40);
  });

  it("tient compte d'une réservation qui commence pendant l'intervalle", () => {
    const bookings = [booking("17:00", 30), booking("19:00", 30)];
    expect(seatsLeft(80, bookings, at("16:00"), duration)).toBe(50);
    expect(seatsLeft(80, bookings, at("18:00"), duration)).toBe(20);
  });

  it("refuse quand le lieu est plein et redevient disponible ensuite", () => {
    const bookings = [booking("17:00", 80)];
    expect(seatsLeft(80, bookings, at("19:45"), duration)).toBe(0);
    expect(seatsLeft(80, bookings, at("20:00"), duration)).toBe(80);
  });

  it("signale un surbooking par un nombre négatif", () => {
    expect(seatsLeft(80, [booking("18:00", 90)], at("18:00"), duration)).toBe(-10);
  });
});

describe("daySlots", () => {
  it("génère des créneaux de 30 min jusqu'à la dernière réservation", () => {
    const slots = daySlots(settings, "2026-10-02");
    expect(slots[0]).toBe(at("11:00"));
    expect(slots.at(-1)).toBe(at("22:00"));
    expect(slots).toHaveLength(23);
  });

  it("ne propose rien un jour fermé", () => {
    const closedSunday = { ...settings, weeklyHours: settings.weeklyHours.map((h, i) => (i === 0 ? { ...h, open: false } : h)) };
    expect(daySlots(closedSunday, "2026-10-04")).toEqual([]);
    expect(daySlots(closedSunday, "2026-10-05").length).toBeGreaterThan(0);
  });

  it("gère une fermeture après minuit sans déborder sur le lendemain", () => {
    const lateNight = { ...settings, weeklyHours: settings.weeklyHours.map((h) => ({ ...h, opensAt: "16:00", closesAt: "02:00" })) };
    const slots = daySlots(lateNight, "2026-10-02");
    expect(slots[0]).toBe(at("16:00"));
    expect(slots.at(-1)).toBe(at("23:30"));
  });
});
