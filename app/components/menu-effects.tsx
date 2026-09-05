"use client";

import { useEffect } from "react";

const promos = [
  ["DIMANCHE", "Steak frites à 30 $"],
  ["LUNDI", "Tacos 4 $ l’unité · vin à 50 % de rabais"],
  ["MARDI", "Ailes de poulet à 50 % de rabais"],
  ["MERCREDI", "Steak frites à 30 $"],
  ["JEUDI", "Burger jalapeños cheddar à 10 $"],
  ["VENDREDI", "Double ton fort — boisson forte doublée"],
  ["SAMEDI", "Bouteille 26 oz (vodka, rhum, gin) à 75 $"],
];

export function MenuEffects() {
  useEffect(() => {
    const root = document.getElementById("mn-root");
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    const today = promos[new Date().getDay()];
    const label = document.getElementById("mn-todaylabel");
    const text = document.getElementById("mn-todaytext");
    if (label) label.textContent = today[0];
    if (text) text.textContent = today[1];

    const items = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    let observer: IntersectionObserver | undefined;
    const show = (element: HTMLElement) => {
      if (element.dataset.shown === "1") return;
      element.dataset.shown = "1";
      element.style.opacity = "1";
      element.style.transform = "none";
    };

    if (!reduce) {
      items.forEach((element) => {
        const delay = element.dataset.delay ?? "0";
        element.style.transition = `opacity .95s cubic-bezier(.16,.84,.24,1) ${delay}ms, transform 1.05s cubic-bezier(.16,.84,.24,1) ${delay}ms`;
        element.style.opacity = "0";
        element.style.transform = "translateY(46px)";
      });
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target as HTMLElement);
          observer?.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -12% 0px" });
      items.forEach((element) => observer?.observe(element));
    }

    const header = document.getElementById("m1000-header");
    const categoryNav = document.getElementById("mn-catnav");
    const hero = document.getElementById("mn-top");
    const heroImage = document.getElementById("mn-heroimg");
    const heroText = document.getElementById("mn-herotext");
    const promoImage = document.getElementById("mn-promoimg");

    const syncNav = () => {
      if (!header || !categoryNav) return;
      const headerHeight = Math.round(header.getBoundingClientRect().height);
      root.style.setProperty("--mn-header-height", `${headerHeight}px`);
      categoryNav.style.top = `${headerHeight}px`;
      const offset = headerHeight + Math.round(categoryNav.getBoundingClientRect().height) + 24;
      root.querySelectorAll<HTMLElement>('section[id^="cat-"], #mn-promo').forEach((section) => {
        section.style.scrollMarginTop = `${offset}px`;
      });
    };

    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      if (reduce || window.innerWidth < 780 || !hero) return;
      const viewportHeight = window.innerHeight;
      const y = Math.max(0, -hero.getBoundingClientRect().top);
      const progress = Math.min(1, y / Math.max(1, hero.offsetHeight));
      if (heroImage) heroImage.style.transform = `translate3d(0,${Math.min(y, hero.offsetHeight) * .24}px,0) scale(${1 + progress * .1})`;
      if (heroText) {
        heroText.style.transform = `translate3d(0,${Math.min(y, hero.offsetHeight) * -.16}px,0)`;
        heroText.style.opacity = String(Math.max(0, 1 - progress * 1.25));
      }
      if (promoImage?.parentElement) {
        const rect = promoImage.parentElement.getBoundingClientRect();
        promoImage.style.transform = `translate3d(0,${((rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight) * -13}%,0)`;
      }
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };

    syncNav();
    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", syncNav);
    window.addEventListener("resize", requestUpdate);

    return () => {
      observer?.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", syncNav);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, []);

  return null;
}
