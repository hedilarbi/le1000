import { TIME_ZONE } from "./config";

// Les dates de réservation sont des chaînes "AAAA-MM-JJ" et les heures "HH:MM",
// toujours exprimées à l'heure locale du restaurant.

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
const MINUTES_PER_DAY = 1440;

const pad = (value: number) => String(value).padStart(2, "0");

export function isDateString(value: string) {
  if (!DATE_PATTERN.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function isTimeString(value: string) {
  return TIME_PATTERN.test(value);
}

export function timeToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

export function minutesToTime(minutes: number) {
  const normalized = ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  return `${pad(Math.floor(normalized / 60))}:${pad(normalized % 60)}`;
}

export function formatTimeFr(value: string | number) {
  const time = typeof value === "number" ? minutesToTime(value) : value;
  return time.replace(":", "h");
}

function dateToUtc(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function weekdayOf(date: string) {
  return dateToUtc(date).getUTCDay();
}

export function addDays(date: string, days: number) {
  const value = dateToUtc(date);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

export function daysBetween(from: string, to: string) {
  return Math.round((dateToUtc(to).getTime() - dateToUtc(from).getTime()) / 86_400_000);
}

const partsFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

function zonedParts(instant: Date) {
  const parts = Object.fromEntries(partsFormatter.formatToParts(instant).map((part) => [part.type, part.value]));
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

export function restaurantNow(now = new Date()) {
  const parts = zonedParts(now);
  return {
    date: `${parts.year}-${pad(parts.month)}-${pad(parts.day)}`,
    minutes: parts.hour * 60 + parts.minute,
  };
}

function offsetMinutes(instant: Date) {
  const parts = zonedParts(instant);
  const asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
  return Math.round((asUtc - Math.floor(instant.getTime() / 1000) * 1000) / 60_000);
}

// Convertit une date + heure locales du restaurant en instant UTC (gère l'heure avancée).
export function zonedTimeToUtc(date: string, minutes: number) {
  const naive = dateToUtc(date).getTime() + minutes * 60_000;
  const firstGuess = naive - offsetMinutes(new Date(naive)) * 60_000;
  return new Date(naive - offsetMinutes(new Date(firstGuess)) * 60_000);
}

const longDateFormatter = new Intl.DateTimeFormat("fr-CA", {
  timeZone: "UTC",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("fr-CA", {
  timeZone: "UTC",
  weekday: "short",
  day: "numeric",
  month: "short",
});

export function formatDateFr(date: string) {
  return longDateFormatter.format(dateToUtc(date));
}

export function formatShortDateFr(date: string) {
  return shortDateFormatter.format(dateToUtc(date));
}

const monthFormatter = new Intl.DateTimeFormat("fr-CA", { timeZone: "UTC", month: "long", year: "numeric" });

export function formatMonthFr(date: string) {
  return monthFormatter.format(dateToUtc(date));
}

export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest} min`;
  return rest ? `${hours} h ${String(rest).padStart(2, "0")}` : `${hours} h`;
}
