# shadcn Themes

A comprehensive, context-based theme library for shadcn/ui with 30+ pre-built themes using the OKLCH color space.

## Features

- 🎨 **30+ pre-made Themes** - From classic dark/light to app-inspired designs (GitHub, VS Code, Dracula, etc.)
- 🌈 **OKLCH Colors** - Modern color space for perceptually uniform colors and better accessibility
- ⚡ **Context-Based API** - Use ThemeProvider and useTheme hook for seamless integration
- 🎯 **Fully Type-Safe** - Complete TypeScript support with exported types
- 🔧 **Customizable** - Built-in theme editor with hue/saturation controls
- 📦 **Flexible** - Use floating switcher or build custom theme UIs
- 💾 **Persistent** - Automatic localStorage support for theme preferences
- 📤 **Exportable** - Copy theme CSS variables for any theme

## Installation

\`\`\`bash
npm install shadcn-themes
\`\`\`

## Quick Start

### 1. Setup ThemeProvider

Wrap your app with `ThemeProvider`:

\`\`\`tsx
import { ThemeProvider } from 'shadcn-themes'

function App() {
return (
<ThemeProvider defaultTheme="dark" storageKey="app-theme">
{/_ Your app components _/}
</ThemeProvider>
)
}
\`\`\`

### 2. Use the useTheme Hook

Access themes from any component:

\`\`\`tsx
import { useTheme } from 'shadcn-themes'

function ThemeSwitcher() {
const { themes, currentTheme, setTheme } = useTheme()

return (
<select
value={currentTheme?.value}
onChange={(e) => setTheme(e.target.value)} >
{themes.map((theme) => (

<option key={theme.value} value={theme.value}>
{theme.name}
</option>
))}
</select>
)
}
\`\`\`

### 3. Optional: Add Floating Switcher

Include the ready-to-use floating theme switcher:

\`\`\`tsx
import { ThemeProvider, FloatingThemeSwitcher } from 'shadcn-themes'

function App() {
return (
<ThemeProvider defaultTheme="dark" storageKey="app-theme">
{/_ Your app _/}
<FloatingThemeSwitcher />
</ThemeProvider>
)
}
\`\`\`

## Available Themes

### Classic Themes

Dark, Light, Midnight, Ocean, Forest, Sunset, Rose, Amber, Violet, Slate, Emerald, Sky, Crimson

### App-Inspired Themes

VS Code, Slack, X (Twitter), GitHub Dark, GitHub Light, Discord, Notion, Linear, Spotify, Dracula, Nord, Solarized Light, Monokai, Jira Dark, Trello Dark

## API Reference

### ThemeProvider

\`\`\`tsx
<ThemeProvider
defaultTheme="dark" // Optional: Initial theme (default: "dark")
storageKey="app-theme" // Optional: localStorage key (default: "shadcn-theme")

> {children}
> </ThemeProvider> > \`\`\`

### useTheme Hook

\`\`\`tsx
const {
themes, // ThemeConfig[] - All available themes
currentTheme, // ThemeConfig | null - Currently active theme
setTheme, // (value: string) => void - Change theme
customTheme, // CustomTheme - Custom theme settings
setCustomTheme // (theme: CustomTheme) => void - Update custom theme
} = useTheme()
\`\`\`

### Exported Types

\`\`\`typescript
import type {
ThemeConfig, // Theme configuration type
ThemeColors, // Color tokens type
CustomTheme, // Custom theme settings type
ThemeContextType // Context type
} from 'shadcn-themes'
\`\`\`

### Exported Utilities

\`\`\`typescript
import {
themes, // All theme configurations
applyTheme, // Apply theme to document
applyCustomTheme // Apply custom theme modifications
} from 'shadcn-themes'
\`\`\`

## Advanced Usage

### Build Custom Theme Switcher

\`\`\`tsx
import { useTheme } from 'shadcn-themes'
import { Button } from '@/components/ui/button'

function CustomThemeSwitcher() {
const { themes, currentTheme, setTheme } = useTheme()

return (

<div className="grid gap-2">
{themes.map((theme) => (
<Button
key={theme.value}
variant={currentTheme?.value === theme.value ? 'default' : 'ghost'}
onClick={() => setTheme(theme.value)} >
{theme.name}
</Button>
))}
</div>
)
}
\`\`\`

### Custom Accent Colors

\`\`\`tsx
import { useTheme } from 'shadcn-themes'
import { Slider } from '@/components/ui/slider'

function ThemeEditor() {
const { customTheme, setCustomTheme } = useTheme()

return (

<div className="space-y-4">
<div>
<label>Hue: {customTheme.hue}°</label>
<Slider
value={[customTheme.hue]}
onValueChange={([hue]) =>
setCustomTheme({ ...customTheme, hue })
}
min={0}
max={360}
/>
</div>
</div>
)
}
\`\`\`

### Export Theme Code

\`\`\`tsx
import { useTheme } from 'shadcn-themes'

function ExportTheme() {
const { currentTheme } = useTheme()

const exportCode = () => {
if (!currentTheme) return

    const cssVars = Object.entries(currentTheme.colors.tokens)
      .map(([key, value]) => {
        const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
        return `  ${cssVar}: ${value};`
      })
      .join('\n')

    const code = `:root {\n${cssVars}\n}`
    navigator.clipboard.writeText(code)

}

return <button onClick={exportCode}>Export Theme</button>
}
\`\`\`

## Requirements

- React 18+
- Tailwind CSS v4+
- shadcn/ui components (optional, for FloatingThemeSwitcher)

## CSS Setup

Add these base tokens to your `globals.css`:

\`\`\`css
@import 'tailwindcss';

@theme inline {
--background: oklch(0.15 0 0);
--foreground: oklch(0.95 0 0);
--primary: oklch(0.65 0.25 265);
/_ ... more tokens _/
}
\`\`\`

The ThemeProvider will dynamically override these values when themes are applied.

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For issues and questions, please open an issue on GitHub.
