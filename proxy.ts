import { NextResponse, type NextRequest } from "next/server";

// Noms possibles du cookie de session admin (production / développement),
// voir SESSION_COOKIE dans app/lib/server/auth.ts.
const SESSION_COOKIES = ["__Host-le1000-admin", "le1000-admin"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedAdmin = pathname.startsWith("/admin") && pathname !== "/admin/login";

  // Vérification rapide sans base de données : sans cookie, on renvoie vers la
  // connexion. La session est réellement validée dans chaque page et action.
  if (isProtectedAdmin && !SESSION_COOKIES.some((name) => request.cookies.has(name))) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // CSP stricte avec nonce : seuls les scripts émis par Next.js s'exécutent.
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const isDev = process.env.NODE_ENV === "development";
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/r/:path*"],
};
