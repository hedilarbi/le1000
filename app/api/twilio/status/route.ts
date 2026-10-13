import { updateSmsDeliveryStatus } from "@/app/lib/server/admin-queries";
import { isValidTwilioSignature, TWILIO_STATUS_PATH } from "@/app/lib/server/sms";

export const runtime = "nodejs";

// Twilio signale ici si le SMS de rappel a été livré ou non.
export async function POST(request: Request) {
  const params = Object.fromEntries(new URLSearchParams(await request.text()));
  if (!isValidTwilioSignature(TWILIO_STATUS_PATH, params, request.headers.get("x-twilio-signature"))) {
    return new Response("Signature invalide", { status: 403 });
  }

  if (params.MessageSid && params.MessageStatus) {
    await updateSmsDeliveryStatus(params.MessageSid, params.MessageStatus, params.ErrorCode || null);
  }
  return new Response(null, { status: 204 });
}
