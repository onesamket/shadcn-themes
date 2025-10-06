# Shadcn Theme Library - Usage Guide

## Installation

\`\`\`bash
npm install shadcn-theme-library

# or

yarn add shadcn-theme-library

# or

pnpm add shadcn-theme-library
\`\`\`

## Quick Start

### 1. Wrap your app with ThemeProvider

\`\`\`tsx
import { ThemeProvider } from 'shadcn-theme-library'

function App() {
return (
<ThemeProvider defaultTheme="dark" storageKey="my-app-theme">
{/_ Your app content _/}
</ThemeProvider>
)
}
\`\`\`

### 2. Use the floating theme switcher (optional)

\`\`\`tsx
import { FloatingThemeSwitcher } from 'shadcn-theme-library'

function App() {
return (
<ThemeProvider>
<YourApp />
<FloatingThemeSwitcher />
</ThemeProvider>
)
}
\`\`\`

### 3. Build your own theme switcher

\`\`\`tsx
import { useTheme } from 'shadcn-theme-library'

function CustomThemeSwitcher() {
const { currentTheme, setTheme, themes } = useTheme()

return (
<select value={currentTheme} onChange={(e) => setTheme(e.target.value)}>
{themes.map((theme) => (

<option key={theme.value} value={theme.value}>
{theme.name}
</option>
))}
</select>
)
}
\`\`\`

## API Reference

### ThemeProvider

\`\`\`tsx
interface ThemeProviderProps {
children: ReactNode
defaultTheme?: string // Default: "dark"
storageKey?: string // Default: "theme"
}
\`\`\`

### useTheme Hook

\`\`\`tsx
const {
// Current state
currentTheme, // string - current theme value
isCustom, // boolean - is custom accent applied
customAccent, // { hue: number, chroma: number }

// Functions
setTheme, // (themeValue: string) => void
applyCustomAccent, // (hue: number, chroma: number) => void
resetCustomAccent, // () => void

// Data
themes, // ThemeConfig[] - all available themes
getCurrentThemeConfig, // () => ThemeConfig | undefined
} = useTheme()
\`\`\`

### Exported Types

\`\`\`tsx
import type {
ThemeConfig,
ThemeValue,
ThemeTokens,
ThemeTokenKey,
CustomAccent,
ThemeContextValue,
} from 'shadcn-theme-library'
\`\`\`

### Exported Utilities

\`\`\`tsx
import {
themes, // ThemeConfig[] - all 30+ themes
applyTheme, // (theme: ThemeConfig) => void
getTheme, // (value: string) => ThemeConfig | undefined
getThemeValues, // () => ThemeValue[]
getThemeNames, // () => string[]
} from 'shadcn-theme-library'
\`\`\`

## Examples

### Example 1: Theme Gallery Page

\`\`\`tsx
import { useTheme } from 'shadcn-theme-library'

function ThemeGallery() {
const { themes, currentTheme, setTheme } = useTheme()

return (

<div className="grid grid-cols-3 gap-4">
{themes.map((theme) => (
<button
key={theme.value}
onClick={() => setTheme(theme.value)}
className={currentTheme === theme.value ? 'ring-2' : ''} >
<h3>{theme.name}</h3>
<p>{theme.description}</p>
<div className="flex gap-1">
{theme.colors.preview.map((color, i) => (
<div key={i} style={{ backgroundColor: color }} />
))}
</div>
</button>
))}
</div>
)
}
\`\`\`

### Example 2: Custom Accent Editor

\`\`\`tsx
import { useTheme } from 'shadcn-theme-library'

function AccentEditor() {
const { customAccent, applyCustomAccent, resetCustomAccent, isCustom } = useTheme()

return (

<div>
<label>
Hue: {customAccent.hue}°
<input
type="range"
min="0"
max="360"
value={customAccent.hue}
onChange={(e) => applyCustomAccent(Number(e.target.value), customAccent.chroma)}
/>
</label>

      <label>
        Saturation: {(customAccent.chroma * 100).toFixed(0)}%
        <input
          type="range"
          min="0"
          max="40"
          value={customAccent.chroma * 100}
          onChange={(e) => applyCustomAccent(customAccent.hue, Number(e.target.value) / 100)}
        />
      </label>

      {isCustom && (
        <button onClick={resetCustomAccent}>Reset to Default</button>
      )}
    </div>

)
}
\`\`\`

### Example 3: Theme Persistence

The library automatically persists theme preferences to localStorage. You can customize the storage key:

\`\`\`tsx
<ThemeProvider storageKey="my-custom-key">
{/_ Themes will be saved to localStorage with this key _/}
</ThemeProvider>
\`\`\`

## Available Themes

The library includes 30+ professionally designed themes:

- **Basic**: Dark, Light, Midnight, Ocean, Forest, Sunset, Rose, Amber, Violet, Slate, Emerald, Sky, Crimson
- **App-Inspired**: VS Code, Slack, X/Twitter, GitHub (Dark/Light), Discord, Notion, Linear, Spotify
- **Popular**: Dracula, Nord, Solarized Light, Monokai, Jira Dark, Trello Dark, YouTube Dark, Google Dark, WhatsApp Dark

All themes use the OKLCH color space for perceptually uniform colors.

## TypeScript Support

The library is fully typed with TypeScript. All exports include comprehensive type definitions.

\`\`\`tsx
import type { ThemeConfig } from 'shadcn-theme-library'

const myTheme: ThemeConfig = {
name: "Custom",
value: "custom",
description: "My custom theme",
colors: {
preview: ["#000", "#fff", "#888"],
tokens: {
// ... all required tokens
}
}
}
