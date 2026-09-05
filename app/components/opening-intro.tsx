"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import logo from "@/public/Le1000_Logo.png";

type IntroStage = "initial" | "logo" | "line" | "label" | "fade" | "open" | "done";

export function OpeningIntro() {
  const [stage, setStage] = useState<IntroStage>("initial");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const skipTimer = window.setTimeout(() => setStage("done"), 0);
      return () => window.clearTimeout(skipTimer);
    }

    document.body.style.overflow = "hidden";
    const timers = [
      window.setTimeout(() => setStage("logo"), 120),
      window.setTimeout(() => setStage("line"), 560),
      window.setTimeout(() => setStage("label"), 700),
      window.setTimeout(() => setStage("fade"), 1850),
      window.setTimeout(() => {
        setStage("open");
        document.body.style.overflow = "";
      }, 2350),
      window.setTimeout(() => setStage("done"), 3700),
    ];

    return () => {
      timers.forEach(window.clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (stage === "done") return null;

  const logoVisible = stage !== "initial";
  const lineVisible = ["line", "label", "fade", "open"].includes(stage);
  const labelVisible = ["label", "fade", "open"].includes(stage);
  const coreFaded = stage === "fade" || stage === "open";
  const doorsOpen = stage === "open";

  return (
    <div className="pointer-events-none fixed inset-0 z-200" aria-hidden="true">
      <div
        className={`absolute inset-x-0 top-0 h-[50.2%] bg-ink transition-transform duration-1250 ease-[cubic-bezier(.72,0,.24,1)] ${
          doorsOpen ? "-translate-y-[101%]" : "translate-y-0"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-[50.2%] bg-ink transition-transform duration-1250 ease-[cubic-bezier(.72,0,.24,1)] ${
          doorsOpen ? "translate-y-[101%]" : "translate-y-0"
        }`}
      />

      <div className={`absolute inset-0 flex flex-col items-center justify-center gap-[22px] transition-opacity duration-800 ease-out ${coreFaded ? "opacity-0" : "opacity-100"}`}>
        <Image
          src={logo}
          alt=""
          priority
          className={`h-[clamp(54px,8vw,96px)] w-auto transition-[opacity,transform] duration-1100 ease-[cubic-bezier(.16,.84,.24,1)] ${
            logoVisible ? "translate-y-0 opacity-100" : "translate-y-3.5 opacity-0"
          }`}
        />
        <span
          className={`block h-px max-w-[260px] bg-[linear-gradient(90deg,rgba(173,111,35,0),#FBE275,rgba(173,111,35,0))] transition-[width] duration-1100 ease-[cubic-bezier(.16,.84,.24,1)] ${
            lineVisible ? "w-[260px]" : "w-0"
          }`}
        />
        <span className={`font-label text-[11px] tracking-[.44em] text-gold/85 transition-opacity duration-900 ease-out ${labelVisible ? "opacity-100" : "opacity-0"}`}>
          RESTO · BAR · RELAIS
        </span>
      </div>
    </div>
  );
}
