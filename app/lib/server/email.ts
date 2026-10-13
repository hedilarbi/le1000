import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

import { RESTAURANT_NAME } from "@/app/lib/reservations/config";

import { readEnv } from "./env";

export type DeliveryResult = {
  status: "sent" | "failed" | "skipped";
  providerId?: string;
  error?: string;
};

// Adresse d'expédition : doit être une identité vérifiée dans SES
// (le domaine le1000resto.com vérifié couvre toutes ses adresses).
const DEFAULT_FROM = "reservation@le1000resto.com";

let transporter: Transporter | undefined;

// Envoi par l'interface SMTP d'Amazon SES (identifiants SMTP générés dans la console SES).
function sesTransport() {
  const host = readEnv("SES_SMTP_HOST");
  const user = readEnv("SES_SMTP_USER");
  const pass = readEnv("SES_SMTP_PASSWORD");
  if (!host || !user || !pass) return null;

  const port = Number(readEnv("SES_SMTP_PORT") ?? 587);
  transporter ??= nodemailer.createTransport({
    host,
    port,
    // 465 : TLS direct ; 587 : STARTTLS obligatoire.
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass },
  });
  return transporter;
}

export async function sendEmail(message: { to: string; subject: string; text: string; html: string; replyTo?: string }): Promise<DeliveryResult> {
  const transport = sesTransport();
  if (!transport) {
    console.warn(`Courriel non envoyé (SMTP SES non configuré) : « ${message.subject} »`);
    return { status: "skipped", error: "SES non configuré" };
  }

  try {
    const info = await transport.sendMail({
      from: { name: RESTAURANT_NAME, address: readEnv("SES_FROM_EMAIL") ?? DEFAULT_FROM },
      to: message.to,
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
    return { status: "sent", providerId: info.messageId };
  } catch (error) {
    console.error("Échec de l'envoi SES (SMTP) :", error);
    return { status: "failed", error: error instanceof Error ? error.message.slice(0, 300) : "Erreur SMTP" };
  }
}
