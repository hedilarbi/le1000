import "server-only";

import { headers } from "next/headers";

// Derrière nginx sur l'EC2, X-Real-IP est écrit par nginx ($remote_addr) et ne
// peut pas être falsifié par le client, contrairement au début de X-Forwarded-For.
export function clientIpFrom(requestHeaders: Headers) {
  const realIp = requestHeaders.get("x-real-ip")?.trim();
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  return (realIp || forwarded || "inconnue").slice(0, 64);
}

export async function requestMeta() {
  const requestHeaders = await headers();
  return {
    ip: clientIpFrom(requestHeaders),
    userAgent: (requestHeaders.get("user-agent") ?? "").slice(0, 300),
  };
}
