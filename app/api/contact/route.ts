import nodemailer from "nodemailer";

export const runtime = "nodejs";

const SMTP_HOST = "node26-ca.n0c.com";
const SMTP_PORT = 465;

function readField(value: unknown, maximumLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maximumLength) : "";
}

export async function POST(request: Request) {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!emailUser || !emailPassword) {
    console.error("Contact email is not configured: EMAIL_USER or EMAIL_PASSWORD is missing.");
    return Response.json({ error: "Le service de courriel n’est pas configuré." }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const data = payload as Record<string, unknown>;
  const nom = readField(data.nom, 120);
  const courriel = readField(data.courriel, 254);
  const sujet = readField(data.sujet, 120) || "Autre";
  const message = readField(data.message, 5000);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nom || !message || !emailPattern.test(courriel)) {
    return Response.json({ error: "Veuillez remplir correctement tous les champs." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

  try {
    await transporter.sendMail({
      from: emailUser,
      to: emailUser,
      envelope: { from: emailUser, to: emailUser },
      subject: `Nouveau message du formulaire - ${sujet}`,
      text: [
        "Nouveau message reçu depuis le formulaire du site Le 1000.",
        "",
        `Nom : ${nom}`,
        `Adresse de réponse : ${courriel}`,
        `Sujet : ${sujet}`,
        "",
        "Message :",
        message,
      ].join("\n"),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Unable to send contact email:", error);
    return Response.json({ error: "Le message n’a pas pu être envoyé. Veuillez réessayer." }, { status: 502 });
  }
}
