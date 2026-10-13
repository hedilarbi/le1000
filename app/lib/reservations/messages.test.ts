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
  it("tient en un seul SMS GSM-7", () => {
    for (const confirmBefore of ["9h00", "16h00"]) {
      const sms = confirmationRequestSms(reservation, manageUrl, confirmBefore);
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
