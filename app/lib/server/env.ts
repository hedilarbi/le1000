import "server-only";

export function readEnv(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export function requireEnv(name: string) {
  const value = readEnv(name);
  if (!value) throw new Error(`Variable d'environnement manquante : ${name}`);
  return value;
}

export const isProduction = process.env.NODE_ENV === "production";
