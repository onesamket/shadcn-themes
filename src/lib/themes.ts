import { themes, type ThemeValue } from "@/constants/themes"
import type { ThemeConfig } from "@/types/theme"

/**
 * 
 * @param value 
 * @returns 
 */
export function getTheme(value: string): ThemeConfig | undefined {
  return themes.find((theme) => theme.value === value)
}

/**
 * 
 * @returns 
 */
export function getThemeValues(): ThemeValue[] {
  return themes.map((theme) => theme.value) as ThemeValue[]
}
/**
 * 
 * @returns 
 */
export function getThemeNames(): string[] {
  return themes.map((theme) => theme.name)
}
/**
 * 
 * @param theme 
 */
export function applyTheme(theme: ThemeConfig): void {
  const root = document.documentElement
  const tokens = theme.colors.tokens

  Object.entries(tokens).forEach(([key, value]) => {
    const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
    root.style.setProperty(cssVar, value)
  })

  root.className = theme.value
}



export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
