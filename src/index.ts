"use client"

/**
 * Theme Provider component that wraps your application to enable theme management.
 * Provides theme context to all child components.
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from 'shadcn-themes'
 *
 * function App() {
 *   return (
 *     <ThemeProvider defaultTheme="dark" storageKey="app-theme">
 *       <YourApp />
 *     </ThemeProvider>
 *   )
 * }
 * ```
 */
export { ThemeProvider } from "@/components/contexts/theme-provider"

/**
 * Type definition for the theme context value.
 * Contains all theme state and functions available through useTheme hook.
 */
export type { ThemeContextValue, CustomAccent } from "@/components/contexts/theme-context"

/**
 * React hook to access theme context.
 * Must be used within a ThemeProvider.
 *
 * @returns Theme context value with current theme, available themes, and theme functions
 * @throws Error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * import { useTheme } from 'shadcn-themes'
 *
 * function MyComponent() {
 *   const { currentTheme, setTheme, themes } = useTheme()
 *
 *   return (
 *     <select value={currentTheme} onChange={(e) => setTheme(e.target.value)}>
 *       {themes.map(theme => (
 *         <option key={theme.value} value={theme.value}>{theme.name}</option>
 *       ))}
 *     </select>
 *   )
 * }
 * ```
 */
export { useTheme } from "@/hooks/use-theme"

/**
 * Utility functions for theme management.
 *
 * - `applyTheme`: Apply a theme configuration to the document
 * - `getTheme`: Get a theme configuration by value
 * - `getThemeValues`: Get all available theme values
 * - `getThemeNames`: Get all available theme names
 */
export { applyTheme, getTheme, getThemeValues, getThemeNames } from "./lib/themes"

/**
 * Type definition for a complete theme configuration.
 * Includes theme metadata and color tokens.
 */
export type { ThemeConfig } from "@/types/theme"

/**
 * Type definitions for theme values and tokens.
 *
 * - `ThemeValue`: Union type of all available theme value strings
 * - `ThemeTokens`: Type for theme color tokens object
 * - `ThemeTokenKey`: Union type of all token keys
 */
export type { ThemeValue, ThemeTokens, ThemeTokenKey } from "./constants/themes"

/**
 * Floating theme switcher component with built-in theme editor.
 * Provides a complete UI for theme selection and customization.
 *
 * Features:
 * - Theme selection with search
 * - Custom accent color editor
 * - Position settings
 * - Keyboard shortcuts (⌘K to toggle)
 * - Minimize/maximize functionality
 *
 * @example
 * ```tsx
 * import { ThemeSwitcher } from 'shadcn-themes'
 *
 * function App() {
 *   return (
 *     <>
 *       <YourApp />
 *       <ThemeSwitcher usePortal />
 *     </>
 *   )
 * }
 * ```
 */
export { ThemeSwitcher } from "./components/theme/switcher"

/**
 * Utility function for conditionally joining class names.
 * Combines clsx and tailwind-merge for optimal class name handling.
 *
 * @param inputs - Class names to combine
 * @returns Merged class name string
 *
 * @example
 * ```tsx
 * import { cn } from 'shadcn-themes'
 *
 * const className = cn('base-class', isActive && 'active-class', 'p-4')
 * ```
 */
export { cn } from "./lib/utils"
