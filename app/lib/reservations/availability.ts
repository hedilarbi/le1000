import { SLOT_INTERVAL_MINUTES } from "./config";
import { timeToMinutes, weekdayOf } from "./time";
import type { ReservationSettings } from "./types";

// Une réservation occupe ses places de [start, end[ en minutes depuis minuit
// de sa date. Chaque date a son propre compteur : rien ne déborde sur le lendemain.
export type OccupiedInterval = {
  start: number;
  end: number;
  partySize: number;
};

export function seatingMinutes(settings: Pick<ReservationSettings, "occupancyMinutes" | "bufferMinutes">) {
  return settings.occupancyMinutes + settings.bufferMinutes;
}

export function occupancyAt(intervals: OccupiedInterval[], minute: number) {
  let total = 0;
  for (const interval of intervals) {
    if (interval.start <= minute && minute < interval.end) total += interval.partySize;
  }
  return total;
}

// Pic d'occupation sur [start, end[. L'occupation ne peut augmenter qu'au début
// d'une réservation : il suffit donc de la mesurer à `start` et à chaque début
// de réservation compris dans l'intervalle. Additionner toutes les réservations
// qui chevauchent l'intervalle surestimerait l'occupation.
export function peakOccupancy(intervals: OccupiedInterval[], start: number, end: number) {
  let peak = occupancyAt(intervals, start);
  for (const interval of intervals) {
    if (interval.start > start && interval.start < end) {
      peak = Math.max(peak, occupancyAt(intervals, interval.start));
    }
  }
  return peak;
}

// Places encore libres pour une nouvelle réservation qui commencerait à `start`.
// Peut être négatif si le lieu est déjà en surbooking.
export function seatsLeft(capacity: number, intervals: OccupiedInterval[], start: number, duration: number) {
  return capacity - peakOccupancy(intervals, start, start + duration);
}

// Créneaux réservables d'une journée, en minutes depuis minuit.
export function daySlots(settings: ReservationSettings, date: string) {
  const hours = settings.weeklyHours[weekdayOf(date)];
  if (!hours?.open) return [];

  const opensAt = timeToMinutes(hours.opensAt);
  let closesAt = timeToMinutes(hours.closesAt);
  if (closesAt <= opensAt) closesAt += 1440;

  const lastSeating = Math.min(closesAt - settings.lastSeatingBeforeCloseMinutes, 1440 - SLOT_INTERVAL_MINUTES);
  const firstSlot = Math.ceil(opensAt / SLOT_INTERVAL_MINUTES) * SLOT_INTERVAL_MINUTES;

  const slots: number[] = [];
  for (let minute = firstSlot; minute <= lastSeating; minute += SLOT_INTERVAL_MINUTES) slots.push(minute);
  return slots;
}

export function isOnSlotGrid(minutes: number) {
  return minutes % SLOT_INTERVAL_MINUTES === 0;
}
