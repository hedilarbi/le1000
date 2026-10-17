import { describe, expect, it } from "vitest";

import { confirmationEmail, confirmationRequestSms, type MessageReservation } from "./messages";

const GSM7 =
  "@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà";

const reservation: MessageReservation = {
  reference: "K7Q2MX",
  firstName: "Marie",
  lastName: "Tremblay",
  phone: "+18195551234",
  email: "marie@example.com",
  note: "",
  date: "2026-10-02",
  time: "19:00",
  partySize: 12,
  areaName: "Terrasse",
};
const manageUrl = `https://le1000resto.com/r/${"a".repeat(24)}`;

describe("confirmationRequestSms", () => {
  it("reprend le texte validé", () => {
    expect(confirmationRequestSms({ ...reservation, partySize: 2 }, manageUrl, "16h00")).toBe(
      `Veuillez confirmer votre réservation pour 2 personnes à 19h avant 16h\n${manageUrl}\nMerci, Le 1000\nSTOP: désabonnement`,
    );
  });

  it("tient en un seul SMS GSM-7", () => {
    for (const [time, confirmBefore] of [["19:00", "16h00"], ["19:30", "16h30"], ["13:30", "12h00"]]) {
      const sms = confirmationRequestSms({ ...reservation, time }, manageUrl, confirmBefore);
      expect([...sms].every((character) => GSM7.includes(character))).toBe(true);
      expect(sms.length).toBeLessThanOrEqual(160);
    }
  });
});

describe("confirmationEmail", () => {
  it("échappe les données du client dans le HTML", () => {
    const email = confirmationEmail({ ...reservation, firstName: "<script>" }, manageUrl, "later", "16h00");
    expect(email.html).not.toContain("<script>");
    expect(email.html).toContain("&lt;script&gt;");
  });
});
