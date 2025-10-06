import type { ThemeConfig } from "@/types/theme";
import { createContext } from "react";

export interface CustomAccent {
    hue: number;
    chroma: number;
}

export interface ThemeContextValue {
    // Current theme state
    currentTheme: string;
    isCustom: boolean;
    customAccent: CustomAccent;

    // Theme functions
    setTheme: (themeValue: string) => void;
    applyCustomAccent: (hue: number, chroma: number) => void;
    resetCustomAccent: () => void;

    // All available themes
    themes: ThemeConfig[];
    floatPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right";

    // Get current theme config
    getCurrentThemeConfig: () => ThemeConfig | undefined;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);