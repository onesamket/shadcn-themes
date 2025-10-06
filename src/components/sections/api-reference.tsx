"use client"

import { CodeBlock } from "@/components/code-block"

export function ApiReference() {
  const themeProviderProps = `interface ThemeProviderProps {
  children: ReactNode
  
  // Basic configuration
  defaultTheme?: string              // Default theme value (default: "dark")
  storageKey?: string                // localStorage key (default: "theme")
  
  // Floating switcher configuration
  enableFloatingSwitcher?: boolean   // Enable floating switcher (default: false)
  floatPosition?: Position           // Position of floating switcher
  
  // Advanced options
  enableSystem?: boolean             // Enable system theme detection (default: false)
  disableTransitionOnChange?: boolean // Disable transitions when changing themes
  attribute?: string                 // HTML attribute to set (default: "data-theme")
  themes?: ThemeConfig[]             // Custom themes array
  
  // Callbacks
  onThemeChange?: (theme: string) => void  // Called when theme changes
  
  // Custom accent defaults
  defaultCustomAccent?: CustomAccent // Default custom accent values
}

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right"`

  const useThemeReturn = `interface ThemeContextValue {
  // Current theme state
  currentTheme: string               // Currently active theme value
  isCustom: boolean                  // Whether custom accent is applied
  customAccent: CustomAccent         // Current custom accent values
  
  // Theme functions
  setTheme: (themeValue: string) => void
  applyCustomAccent: (hue: number, chroma: number) => void
  resetCustomAccent: () => void
  
  // All available themes
  themes: ThemeConfig[]              // Array of all theme configurations
  floatPosition: Position            // Current float position
  
  // Get current theme config
  getCurrentThemeConfig: () => ThemeConfig | undefined
}

interface CustomAccent {
  hue: number      // 0-360
  chroma: number   // 0-0.4
}`

  const themeConfig = `interface ThemeConfig {
  name: string                       // Display name
  value: string                      // Unique identifier
  description: string                // Short description
  colors: {
    preview: string[]                // Preview colors for UI
    tokens: ThemeTokens              // All color tokens
  }
}

interface ThemeTokens {
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  destructiveForeground: string
  border: string
  input: string
  ring: string
  sidebar: string
  sidebarForeground: string
  sidebarPrimary: string
  sidebarPrimaryForeground: string
  sidebarAccent: string
  sidebarAccentForeground: string
  sidebarBorder: string
  sidebarRing: string
}`

  const utilityFunctions = `/**
 * Get a theme configuration by its value
 */
function getTheme(value: string): ThemeConfig | undefined

/**
 * Get all available theme values
 */
function getThemeValues(): ThemeValue[]

/**
 * Get all available theme names
 */
function getThemeNames(): string[]

/**
 * Apply a theme configuration to the document
 */
function applyTheme(theme: ThemeConfig): void

/**
 * Get the system color scheme preference
 */
function getSystemTheme(): "light" | "dark"

/**
 * Utility for conditionally joining class names
 */
function cn(...inputs: ClassValue[]): string`

  const themeSwitcherProps = `interface ThemeSwitcherProps {
  /**
   * Whether to render in a portal (recommended)
   * @default true
   */
  usePortal?: boolean
  
  /**
   * Custom class name for the container
   */
  className?: string
  
  /**
   * Callback when switcher is opened
   */
  onOpen?: () => void
  
  /**
   * Callback when switcher is closed
   */
  onClose?: () => void
}`

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">API Reference</h1>
        <p className="text-lg text-muted-foreground">
          Complete API documentation for all components, hooks, and utilities.
        </p>
      </div>

      {/* ThemeProvider */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">ThemeProvider</h2>
        <p className="text-muted-foreground">
          The main provider component that wraps your application to enable theme management.
        </p>
        <CodeBlock code={themeProviderProps} language="typescript" filename="types.ts" />
      </div>

      {/* useTheme */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">useTheme</h2>
        <p className="text-muted-foreground">
          React hook to access theme context. Must be used within a ThemeProvider.
        </p>
        <CodeBlock code={useThemeReturn} language="typescript" filename="types.ts" />
      </div>

      {/* ThemeConfig */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">ThemeConfig</h2>
        <p className="text-muted-foreground">Type definition for theme configuration objects.</p>
        <CodeBlock code={themeConfig} language="typescript" filename="types.ts" />
      </div>

      {/* Utility Functions */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Utility Functions</h2>
        <p className="text-muted-foreground">Helper functions for theme management and manipulation.</p>
        <CodeBlock code={utilityFunctions} language="typescript" filename="utils.ts" />
      </div>

      {/* ThemeSwitcher */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">ThemeSwitcher</h2>
        <p className="text-muted-foreground">
          Floating theme switcher component with built-in editor and keyboard shortcuts.
        </p>
        <CodeBlock code={themeSwitcherProps} language="typescript" filename="types.ts" />

        <div className="rounded-lg border bg-card p-4">
          <h4 className="mb-2 font-semibold">Keyboard Shortcuts</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <code className="rounded bg-muted px-2 py-1">⌘K</code> or{" "}
              <code className="rounded bg-muted px-2 py-1">Ctrl+K</code> - Toggle theme studio
            </li>
            <li>
              <code className="rounded bg-muted px-2 py-1">Esc</code> - Close theme studio
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
