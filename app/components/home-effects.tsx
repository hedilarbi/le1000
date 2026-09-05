"use client";

import { useEffect } from "react";

export function HomeEffects() {
  useEffect(() => {
    const root = document.getElementById("m1000-root");
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const cleanups: Array<() => void> = [];
    const at = (delay: number, callback: () => void) => {
      timers.push(window.setTimeout(callback, delay));
    };

    const intro = document.getElementById("m1000-intro");
    if (intro) {
      if (reduce) intro.remove();
      else {
        document.body.style.overflow = "hidden";
        at(120, () => {
          const logo = document.getElementById("m1000-intro-logo");
          if (logo) { logo.style.opacity = "1"; logo.style.transform = "none"; }
        });
        at(560, () => {
          const line = document.getElementById("m1000-intro-line");
          if (line) line.style.width = "260px";
        });
        at(700, () => {
          const label = document.getElementById("m1000-intro-label");
          if (label) label.style.opacity = "1";
        });
        at(1850, () => {
          const core = document.getElementById("m1000-intro-core");
          if (core) core.style.opacity = "0";
        });
        at(2350, () => {
          const top = document.getElementById("m1000-intro-top");
          const bottom = document.getElementById("m1000-intro-bot");
          if (top) top.style.transform = "translateY(-101%)";
          if (bottom) bottom.style.transform = "translateY(101%)";
          document.body.style.overflow = "";
        });
        at(3700, () => intro.remove());
      }
    }

    const promos = [
      ["DIMANCHE", "Steak frites à 30 $"],
      ["LUNDI", "Tacos 4 $ l’unité · vin à −50 %"],
      ["MARDI", "Ailes de poulet à −50 %"],
      ["MERCREDI", "Steak frites à 30 $"],
      ["JEUDI", "Burger jalapeños cheddar à 10 $"],
      ["VENDREDI", "Double ton fort"],
      ["SAMEDI", "Bouteille 26 oz à 75 $"],
    ];
    const day = new Date().getDay();
    const todayLabel = document.getElementById("m1000-todaylabel");
    const todayText = document.getElementById("m1000-todaytext");
    if (todayLabel) todayLabel.textContent = promos[day][0];
    if (todayText) todayText.textContent = promos[day][1];
    const dayCard = root.querySelector<HTMLElement>(`[data-day="${day}"]`);
    if (dayCard) {
      dayCard.style.borderColor = "rgba(209,166,71,.6)";
      dayCard.style.background = "linear-gradient(150deg,rgba(209,166,71,.18),rgba(13,14,14,.42))";
    }

    const revealItems = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    const reveal = (element: HTMLElement) => {
      if (element.dataset.shown === "1") return;
      element.dataset.shown = "1";
      element.style.opacity = "1";
      element.style.transform = "none";
      if (element.dataset.reveal === "mask") element.style.clipPath = "inset(0% 0 0 0)";
    };

    let observer: IntersectionObserver | undefined;
    if (!reduce) {
      revealItems.forEach((element) => {
        const delay = element.dataset.delay ?? "0";
        element.style.transition = `opacity 1.05s cubic-bezier(.16,.84,.24,1) ${delay}ms, transform 1.15s cubic-bezier(.16,.84,.24,1) ${delay}ms, clip-path 1.3s cubic-bezier(.16,.84,.24,1) ${delay}ms`;
        if (element.dataset.reveal === "mask") element.style.clipPath = "inset(100% 0 0 0)";
        else { element.style.opacity = "0"; element.style.transform = "translateY(72px) scale(.97)"; }
      });
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            observer?.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -16% 0px" });
      revealItems.forEach((element) => observer?.observe(element));
    }

    root.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
      const zoom = card.querySelector<HTMLElement>("[data-zoom]");
      const arrow = card.querySelector<HTMLElement>("[data-arrow-glyph]");
      const enter = () => { if (!reduce && zoom) zoom.style.transform = "scale(1.06)"; if (arrow) arrow.style.transform = "translateX(7px)"; };
      const leave = () => { if (zoom) zoom.style.transform = "none"; if (arrow) arrow.style.transform = "none"; };
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      cleanups.push(() => { card.removeEventListener("mouseenter", enter); card.removeEventListener("mouseleave", leave); });
    });

    const scrollCue = document.getElementById("m1000-scrollcue");
    const heroImage = document.getElementById("m1000-heroimg");
    const heroText = document.getElementById("m1000-herotext");
    const hero = document.getElementById("hero");
    const updateScroll = () => {
      const y = window.scrollY;
      if (scrollCue) scrollCue.style.opacity = String(Math.max(0, 1 - y / 260));
      if (!reduce && window.innerWidth >= 780 && hero) {
        const progress = Math.min(1, y / Math.max(1, hero.offsetHeight));
        if (heroImage) heroImage.style.transform = `translate3d(0,${Math.min(y, hero.offsetHeight) * .2}px,0) scale(${1.06 + progress * .14})`;
        if (heroText) {
          heroText.style.transform = `translate3d(0,${y * -.22}px,0)`;
          heroText.style.opacity = String(Math.max(0, 1 - progress * 1.35));
        }
      }
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", updateScroll));

    return () => {
      timers.forEach(window.clearTimeout);
      observer?.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
