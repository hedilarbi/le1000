import { describe, expect, it } from "vitest";

import { addDays, formatDateFr, formatTimeFr, isDateString, restaurantNow, zonedTimeToUtc } from "./time";
import { formatPhoneInput, normalizePhone } from "./validation";

describe("dates et heures du restaurant", () => {
  it("valide les dates réelles uniquement", () => {
    expect(isDateString("2026-10-02")).toBe(true);
    expect(isDateString("2026-02-30")).toBe(false);
    expect(isDateString("02/10/2026")).toBe(false);
  });

  it("convertit l'heure locale en UTC, heure avancée comprise", () => {
    expect(zonedTimeToUtc("2026-10-02", 17 * 60).toISOString()).toBe("2026-10-02T21:00:00.000Z");
    expect(zonedTimeToUtc("2026-12-15", 19 * 60).toISOString()).toBe("2026-12-16T00:00:00.000Z");
  });

  it("donne la date et l'heure locales à partir d'un instant UTC", () => {
    expect(restaurantNow(new Date("2026-10-03T02:30:00Z"))).toEqual({ date: "2026-10-02", minutes: 22 * 60 + 30 });
  });

  it("formate en français", () => {
    expect(formatTimeFr("19:00")).toBe("19h00");
    expect(formatDateFr("2026-10-02")).toBe("vendredi 2 octobre 2026");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
  });
});

describe("normalizePhone", () => {
  it("accepte les formats courants", () => {
    expect(normalizePhone("819-697-1214")).toBe("+18196971214");
    expect(normalizePhone("(819) 697 1214")).toBe("+18196971214");
    expect(normalizePhone("+1 819 697 1214")).toBe("+18196971214");
  });

  it("refuse les numéros incomplets ou invalides", () => {
    expect(normalizePhone("697-1214")).toBeNull();
    expect(normalizePhone("019-697-1214")).toBeNull();
  });
});

describe("formatPhoneInput", () => {
  it("met en forme pendant la saisie et retire le +1", () => {
    for (const input of ["8192345678", "819-234-5678", "819 234 5678", "(819) 234-5678", "+1 819 234 5678", "+18192345678", "18192345678"]) {
      expect(formatPhoneInput(input)).toBe("819-234-5678");
      expect(normalizePhone(formatPhoneInput(input))).toBe("+18192345678");
    }
    expect(formatPhoneInput("819")).toBe("819");
    expect(formatPhoneInput("81923")).toBe("819-23");
  });
});
