"use client";

import { useEffect } from "react";

export function ContactEffects() {
  useEffect(() => {
    const root = document.getElementById("ct-root");
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];
    const revealItems = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
    let observer: IntersectionObserver | undefined;
    let statusTimer = 0;

    const form = root.querySelector<HTMLFormElement>("#ct-contact-form");
    const status = document.getElementById("ct-status");
    const submitButton = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
    const successModal = document.getElementById("ct-success-modal");
    const modalPanel = successModal?.firstElementChild as HTMLElement | null;
    const modalClose = document.getElementById("ct-success-close") as HTMLButtonElement | null;
    const modalConfirm = document.getElementById("ct-success-confirm") as HTMLButtonElement | null;

    const closeSuccessModal = () => {
      if (!successModal) return;
      successModal.style.opacity = "0";
      successModal.style.pointerEvents = "none";
      successModal.setAttribute("aria-hidden", "true");
      if (modalPanel) modalPanel.style.transform = "translateY(14px) scale(.98)";
      submitButton?.focus();
    };
    const openSuccessModal = () => {
      if (!successModal) return;
      successModal.style.opacity = "1";
      successModal.style.pointerEvents = "auto";
      successModal.setAttribute("aria-hidden", "false");
      if (modalPanel) modalPanel.style.transform = "none";
      modalClose?.focus();
    };
    const closeFromBackdrop = (event: Event) => {
      if (event.target === successModal) closeSuccessModal();
    };
    const closeFromKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape" && successModal?.getAttribute("aria-hidden") === "false") closeSuccessModal();
    };

    modalClose?.addEventListener("click", closeSuccessModal);
    modalConfirm?.addEventListener("click", closeSuccessModal);
    successModal?.addEventListener("click", closeFromBackdrop);
    window.addEventListener("keydown", closeFromKeyboard);
    cleanups.push(() => {
      modalClose?.removeEventListener("click", closeSuccessModal);
      modalConfirm?.removeEventListener("click", closeSuccessModal);
      successModal?.removeEventListener("click", closeFromBackdrop);
      window.removeEventListener("keydown", closeFromKeyboard);
    });

    const submit = async (event: Event) => {
      event.preventDefault();
      if (!form || !submitButton) return;

      submitButton.disabled = true;
      submitButton.style.opacity = ".65";
      submitButton.textContent = "Envoi en cours…";
      if (status) {
        status.textContent = "";
        status.style.opacity = "0";
      }

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        const result = (await response.json()) as { error?: string };

        if (!response.ok) throw new Error(result.error || "Une erreur est survenue.");

        form.reset();
        openSuccessModal();
      } catch (error) {
        if (status) {
          status.textContent = error instanceof Error ? error.message : "Le message n’a pas pu être envoyé.";
          status.style.color = "#ff9b8f";
          status.style.opacity = "1";
        }
        window.clearTimeout(statusTimer);
        statusTimer = window.setTimeout(() => {
          if (status) status.style.opacity = "0";
        }, 6000);
      } finally {
        submitButton.disabled = false;
        submitButton.style.opacity = "1";
        submitButton.textContent = "Envoyer le message";
      }

    };
    form?.addEventListener("submit", submit);
    if (form) cleanups.push(() => form.removeEventListener("submit", submit));

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

    const hero = document.getElementById("ct-hero");
    const heroImage = document.getElementById("ct-heroimg");
    const parallaxItems = [...root.querySelectorAll<HTMLElement>("[data-parallax]")];
    let frame = 0;

    const update = () => {
      frame = 0;
      if (reduce || window.innerWidth < 780) return;
      const viewportHeight = window.innerHeight;
      const y = hero ? Math.max(0, -hero.getBoundingClientRect().top) : 0;
      const progress = Math.min(1, y / Math.max(1, hero?.offsetHeight ?? viewportHeight));
      if (heroImage && hero) heroImage.style.transform = `translate3d(0,${Math.min(y, hero.offsetHeight) * .2}px,0) scale(${1.05 + progress * .1})`;
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
      window.clearTimeout(statusTimer);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
