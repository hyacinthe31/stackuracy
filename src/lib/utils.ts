import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const typeLabels: Record<string, string> = {
  uilibrary: "Librairie UI",
};

export function getTypeLabel(slug: string): string {
  return typeLabels[slug.toLowerCase()] || slug;
}