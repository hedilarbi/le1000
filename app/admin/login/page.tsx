import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import { getCurrentAdmin } from "@/app/lib/server/auth";
import logo from "@/public/Le1000_Logo.png";

import { ui } from "../_components/ui";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Connexion" };

export default async function AdminLoginPage() {
  if (await getCurrentAdmin()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className={`${ui.card} w-full max-w-sm p-7`}>
        <Image src={logo} alt="Le 1000 Resto Bar Relais" className="mx-auto mb-6 h-14 w-auto" priority />
        <h1 className={`${ui.heading} mb-1 text-center`}>Réservations</h1>
        <p className={`${ui.muted} mb-6 text-center`}>Espace réservé au personnel</p>
        <LoginForm />
      </div>
    </main>
  );
}
