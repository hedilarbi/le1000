"use client";

import { useEffect } from "react";

export function AboutEffects() {
  useEffect(() => {
    const root = document.getElementById("ap-root");
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    const revealItems = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    let observer: IntersectionObserver | undefined;

    const show = (element: HTMLElement) => {
      if (element.dataset.shown === "1") return;
      element.dataset.shown = "1";
      element.style.opacity = "1";
      element.style.transform = "none";
      if (element.dataset.reveal === "mask") element.style.clipPath = "inset(0% 0 0 0)";
    };

    if (!reduce) {
      revealItems.forEach((element) => {
        const delay = element.dataset.delay ?? "0";
        element.style.transition = `opacity 1.05s cubic-bezier(.16,.84,.24,1) ${delay}ms, transform 1.15s cubic-bezier(.16,.84,.24,1) ${delay}ms, clip-path 1.3s cubic-bezier(.16,.84,.24,1) ${delay}ms`;
        if (element.dataset.reveal === "mask") element.style.clipPath = "inset(100% 0 0 0)";
        else {
          element.style.opacity = "0";
          element.style.transform = "translateY(66px) scale(.975)";
        }
      });

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target as HTMLElement);
          observer?.unobserve(entry.target);
        });
      }, { rootMargin: "0px 0px -16% 0px" });
      revealItems.forEach((element) => observer?.observe(element));
    }

    root.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
      const zoom = card.querySelector<HTMLElement>("[data-zoom]");
      const enter = () => { if (!reduce && zoom) zoom.style.transform = "scale(1.06)"; };
      const leave = () => { if (zoom) zoom.style.transform = "none"; };
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      });
    });

    root.querySelectorAll<HTMLElement>("[data-arrow]").forEach((link) => {
      const arrow = link.querySelector<HTMLElement>("[data-arrow-glyph]");
      const enter = () => { if (arrow) arrow.style.transform = "translateX(7px)"; };
      const leave = () => { if (arrow) arrow.style.transform = "none"; };
      link.addEventListener("mouseenter", enter);
      link.addEventListener("mouseleave", leave);
      cleanups.push(() => {
        link.removeEventListener("mouseenter", enter);
        link.removeEventListener("mouseleave", leave);
      });
    });

    const hero = document.getElementById("ap-hero");
    const heroImage = document.getElementById("ap-heroimg");
    const placeImage = document.getElementById("ap-lieuimg");
    const parallaxItems = [...root.querySelectorAll<HTMLElement>("[data-parallax]")];
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduce || window.innerWidth < 780) return;
      const viewportHeight = window.innerHeight;
      const y = hero ? Math.max(0, -hero.getBoundingClientRect().top) : 0;
      const progress = Math.min(1, y / Math.max(1, hero?.offsetHeight ?? viewportHeight));
      if (heroImage && hero) heroImage.style.transform = `translate3d(0,${Math.min(y, hero.offsetHeight) * .2}px,0) scale(${1.05 + progress * .1})`;
      if (placeImage?.parentElement) {
        const rect = placeImage.parentElement.getBoundingClientRect();
        placeImage.style.transform = `translateY(${((rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight) * -14}%)`;
      }
      parallaxItems.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const strength = Number.parseFloat(element.dataset.parallax ?? "0");
        const offset = ((rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight) * strength * 620;
        element.style.transform = `translate3d(0,${offset.toFixed(2)}px,0)`;
      });
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      observer?.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
