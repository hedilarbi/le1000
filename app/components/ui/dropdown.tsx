"use client";

import { useEffect, useId, useRef, useState } from "react";

export type DropdownOption = { value: string; label: string; disabled?: boolean; hint?: string };

const THEMES = {
  // Site public : mêmes codes que les champs du formulaire de contact.
  site: {
    button:
      "flex w-full items-center justify-between gap-3 rounded-[2px] border border-ivory/15 bg-ink/50 px-4 py-3.5 text-left text-[15px] font-light text-ivory outline-none transition focus-visible:border-gold disabled:cursor-not-allowed disabled:opacity-50",
    open: "border-gold bg-ink/75",
    menu: "rounded-[2px] border border-gold/40 bg-ink-soft shadow-2xl",
    option: "px-4 py-2.5 text-[15px]",
    active: "bg-gold/15 text-gold-bright",
    selected: "text-gold",
  },
  // Admin : champs arrondis plus compacts.
  admin: {
    button:
      "flex w-full items-center justify-between gap-3 rounded-lg border border-ivory/15 bg-ink px-3 py-2.5 text-left text-[15px] text-ivory outline-none transition focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-gold/30 disabled:cursor-not-allowed disabled:opacity-50",
    open: "border-gold ring-2 ring-gold/30",
    menu: "rounded-lg border border-ivory/15 bg-charcoal shadow-2xl",
    option: "px-3 py-2 text-[15px]",
    active: "bg-gold/15 text-gold-bright",
    selected: "text-gold",
  },
};

// Liste déroulante accessible (clavier : flèches, Entrée, Échap) et stylée comme le site.
// Avec `name`, la valeur est envoyée avec le formulaire via un champ caché.
export function Dropdown({
  value,
  options,
  onChange,
  placeholder,
  name,
  label,
  disabled,
  theme = "site",
}: {
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  placeholder: string;
  name?: string;
  label: string;
  disabled?: boolean;
  theme?: keyof typeof THEMES;
}) {
  const styles = THEMES[theme];
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [open]);

  useEffect(() => {
    if (open && activeIndex >= 0) listRef.current?.children[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const openMenu = () => {
    setActiveIndex(Math.max(0, options.findIndex((option) => option.value === value)));
    setOpen(true);
  };

  const choose = (option: DropdownOption | undefined) => {
    if (!option || option.disabled) return;
    onChange(option.value);
    setOpen(false);
  };

  const move = (step: number) => {
    if (!options.length) return;
    let index = activeIndex;
    for (let tries = 0; tries < options.length; tries += 1) {
      index = (index + step + options.length) % options.length;
      if (!options[index].disabled) break;
    }
    setActiveIndex(index);
  };

  return (
    <div ref={rootRef} className="relative">
      {name && <input type="hidden" name={name} value={value} />}
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={(event) => {
          if (event.key === "Escape") return setOpen(false);
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            if (!open) return openMenu();
            return move(event.key === "ArrowDown" ? 1 : -1);
          }
          if ((event.key === "Enter" || event.key === " ") && open) {
            event.preventDefault();
            choose(options[activeIndex]);
          }
        }}
        className={`${styles.button} ${open ? styles.open : ""}`}
      >
        <span className={selected ? "" : "text-ivory/40"}>{selected?.label ?? placeholder}</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className={`h-4 w-4 shrink-0 fill-current text-gold transition ${open ? "rotate-180" : ""}`}>
          <path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
        </svg>
      </button>

      {open && (
        <ul ref={listRef} id={listId} role="listbox" aria-label={label} className={`absolute left-0 right-0 z-30 mt-1 max-h-64 overflow-y-auto py-1 ${styles.menu}`}>
          {options.length === 0 && <li className={`${styles.option} text-ivory/45`}>Aucun choix disponible</li>}
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              aria-disabled={option.disabled}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(option)}
              className={`flex cursor-pointer items-center justify-between gap-3 ${styles.option} ${
                option.disabled ? "cursor-not-allowed text-ivory/30" : index === activeIndex ? styles.active : option.value === value ? styles.selected : "text-ivory"
              }`}
            >
              <span>{option.label}</span>
              {option.hint && <span className="text-xs text-ivory/40">{option.hint}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
