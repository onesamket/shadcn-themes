import { themes } from "@/constants/themes";
import { applyTheme, getSystemTheme } from "@/lib/themes";

import type { ThemeConfig } from "@/types/theme";
import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext, type CustomAccent, type ThemeContextValue } from "./theme-context";

export interface ThemeProviderProps {
    children: ReactNode;

    // Basic configuration
    defaultTheme?: string;
    storageKey?: string;

    // Floating switcher configuration
    enableFloatingSwitcher?: boolean;
    floatPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";

    // Advanced options
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
    attribute?: string;
    themes?: ThemeConfig[];

    // Callbacks
    onThemeChange?: (theme: string) => void;

    // Custom accent defaults
    defaultCustomAccent?: CustomAccent;
}

export function ThemeProvider({
    children,
    defaultTheme = "dark",
    storageKey = "theme",
    floatPosition = "bottom-right",
    enableSystem = false,
    disableTransitionOnChange = false,
    attribute = "data-theme",
    themes: customThemes,
    onThemeChange,
    defaultCustomAccent = { hue: 265, chroma: 0.25 },
}: ThemeProviderProps) {
    const [currentTheme, setCurrentTheme] = useState<string>(defaultTheme);
    const [isCustom, setIsCustom] = useState(false);
    const [customAccent, setCustomAccent] = useState<CustomAccent>(defaultCustomAccent);

    // Use custom themes if provided, otherwise use default themes
    const themeList = customThemes || themes;

    // Load saved theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem(storageKey);
        const savedCustomHue = localStorage.getItem(`${storageKey}-custom-hue`);
        const savedCustomChroma = localStorage.getItem(`${storageKey}-custom-chroma`);
        const savedIsCustom = localStorage.getItem(`${storageKey}-is-custom`);

        if (enableSystem && !savedTheme) {
            const systemTheme = getSystemTheme();
            const theme = themeList.find((t) => t.value === systemTheme);
            if (theme) {
                applyTheme(theme);
                setCurrentTheme(systemTheme);
            }
            return;
        }

        if (savedTheme) {
            const theme = themeList.find((t) => t.value === savedTheme);
            if (theme) {
                if (savedIsCustom === "true" && savedCustomHue && savedCustomChroma) {
                    const accent = {
                        hue: Number(savedCustomHue),
                        chroma: Number(savedCustomChroma),
                    };
                    applyThemeWithCustomAccent(theme, accent);
                    setCustomAccent(accent);
                    setIsCustom(true);
                } else {
                    applyTheme(theme);
                }
                setCurrentTheme(savedTheme);
            }
        } else {
            // Apply default theme
            const theme = themeList.find((t) => t.value === defaultTheme);
            if (theme) {
                applyTheme(theme);
            }
        }
    }, [defaultTheme, storageKey, enableSystem, themeList]);

    // System theme listener
    useEffect(() => {
        if (!enableSystem) return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            const systemTheme = e.matches ? "dark" : "light";
            const theme = themeList.find((t) => t.value === systemTheme);
            if (theme) {
                applyTheme(theme);
                setCurrentTheme(systemTheme);
                onThemeChange?.(systemTheme);
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [enableSystem, themeList, onThemeChange]);

    const applyThemeWithCustomAccent = (theme: ThemeConfig, accent: CustomAccent) => {
        const root = document.documentElement;
        const tokens = theme.colors.tokens;

        if (disableTransitionOnChange) {
            root.style.setProperty("transition", "none");
        }

        Object.entries(tokens).forEach(([key, value]) => {
            const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;

            // Apply custom accent to primary colors
            if (
                key === "primary" ||
                key === "ring" ||
                key === "sidebarPrimary" ||
                key === "sidebarRing"
            ) {
                const lightnessMatch = value.match(/oklch\(([\d.]+)/);
                const lightness = lightnessMatch ? lightnessMatch[1] : "0.65";
                root.style.setProperty(
                    cssVar,
                    `oklch(${lightness} ${accent.chroma} ${accent.hue})`,
                );
            } else {
                root.style.setProperty(cssVar, value);
            }
        });

        root.setAttribute(attribute, theme.value);
        root.className = theme.value;

        // Re-enable transitions
        if (disableTransitionOnChange) {
            setTimeout(() => {
                root.style.removeProperty("transition");
            }, 0);
        }
    };

    const setTheme = (themeValue: string) => {
        const theme = themeList.find((t) => t.value === themeValue);
        if (!theme) return;

        if (isCustom) {
            applyThemeWithCustomAccent(theme, customAccent);
        } else {
            applyTheme(theme);
        }

        setCurrentTheme(themeValue);
        localStorage.setItem(storageKey, themeValue);
        onThemeChange?.(themeValue);
    };

    const applyCustomAccent = (hue: number, chroma: number) => {
        const theme = themeList.find((t) => t.value === currentTheme);
        if (!theme) return;

        const accent = { hue, chroma };
        setCustomAccent(accent);
        setIsCustom(true);
        applyThemeWithCustomAccent(theme, accent);

        localStorage.setItem(`${storageKey}-custom-hue`, hue.toString());
        localStorage.setItem(`${storageKey}-custom-chroma`, chroma.toString());
        localStorage.setItem(`${storageKey}-is-custom`, "true");
    };

    const resetCustomAccent = () => {
        const theme = themeList.find((t) => t.value === currentTheme);
        if (!theme) return;

        setIsCustom(false);
        applyTheme(theme);

        localStorage.setItem(`${storageKey}-is-custom`, "false");
    };

    const getCurrentThemeConfig = () => {
        return themeList.find((t) => t.value === currentTheme);
    };

    const value: ThemeContextValue = {
        currentTheme,
        isCustom,
        customAccent,
        setTheme,
        applyCustomAccent,
        resetCustomAccent,
        themes: themeList,
        floatPosition,
        getCurrentThemeConfig,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export default ThemeProvider;
