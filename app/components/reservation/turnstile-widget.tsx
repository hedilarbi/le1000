"use client";

import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let scriptPromise: Promise<void> | null = null;

function loadTurnstile() {
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    if (window.turnstile) return resolve();
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Turnstile indisponible"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

// Vérification anti-robot Cloudflare Turnstile. Le jeton obtenu est à usage unique :
// changer `resetKey` (après chaque envoi du formulaire) en redemande un nouveau.
export function TurnstileWidget({ siteKey, onToken, resetKey }: { siteKey: string; onToken: (token: string) => void; resetKey: unknown }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    let cancelled = false;
    loadTurnstile()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "dark",
          language: "fr",
          callback: (token: string) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(""),
          "error-callback": () => onTokenRef.current(""),
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      if (widgetIdRef.current) window.turnstile?.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [siteKey]);

  useEffect(() => {
    if (!widgetIdRef.current) return;
    window.turnstile?.reset(widgetIdRef.current);
    onTokenRef.current("");
  }, [resetKey]);

  if (failed) {
    return (
      <p className="text-sm text-red-200">
        La vérification anti-robot n&apos;a pas pu se charger. Désactivez votre bloqueur de publicité puis rechargez la page.
      </p>
    );
  }
  return <div ref={containerRef} className="min-h-[65px]" />;
}
