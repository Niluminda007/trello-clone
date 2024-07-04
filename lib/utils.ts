import { colors } from "@/constants/colors";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function generateInitials(name: string) {
  const nameParts = name.split(" ");
  let initials = "";
  for (const name of nameParts) {
    initials += name.slice(0, 1);
  }
  return initials.length > 2 ? initials.slice(0, 2) : initials;
}

export function getRandomColor(): string {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export const reloadSession = () => {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};

export function extractToken(url: string) {
  const regex = /\/invite\/b\/([a-f0-9-]+)$/i;
  const match = url.match(regex);
  return match ? match[1] : null;
}
