import { handleInboundSms } from "@/app/lib/server/admin-queries";
import { isValidTwilioSignature, TWILIO_INBOUND_PATH } from "@/app/lib/server/sms";

export const runtime = "nodejs";

const EMPTY_TWIML = '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';

// Réponse d'un client au SMS de rappel. Twilio gère lui-même STOP / START.
export async function POST(request: Request) {
  const params = Object.fromEntries(new URLSearchParams(await request.text()));
  if (!isValidTwilioSignature(TWILIO_INBOUND_PATH, params, request.headers.get("x-twilio-signature"))) {
    return new Response("Signature invalide", { status: 403 });
  }

  if (params.From && params.Body) {
    await handleInboundSms(params.From, params.Body, params.MessageSid ?? "");
  }
  return new Response(EMPTY_TWIML, { headers: { "Content-Type": "text/xml" } });
}
