"use client";

import { useState } from "react";

import { MAX_ONLINE_PARTY_SIZE } from "@/app/lib/reservations/config";

import { Dropdown } from "../ui/dropdown";

// Nombre de personnes pour le formulaire « Réserver » de l'accueil (envoyé en ?personnes=).
export function PartySizeDropdown() {
  const [value, setValue] = useState("2");
  return (
    <Dropdown
      label="Nombre de personnes"
      placeholder="Choisir"
      name="personnes"
      value={value}
      onChange={setValue}
      options={Array.from({ length: MAX_ONLINE_PARTY_SIZE + 1 }, (_, index) => {
        const size = index + 1;
        return { value: String(size), label: size > MAX_ONLINE_PARTY_SIZE ? `${size} et plus` : `${size} personne${size > 1 ? "s" : ""}` };
      })}
    />
  );
}
