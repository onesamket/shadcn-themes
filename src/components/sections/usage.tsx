"use client"

import { CodeBlock } from "@/components/code-block"

export function Usage() {
  const contextUsage = `import { ThemeProvider } from 'shadcn-themes'

function App() {
  return (
    <ThemeProvider 
      defaultTheme="dark" 
      storageKey="app-theme"
    >
      {/* Your app components */}
    </ThemeProvider>
  )
}`

  const hookUsage = `import { useTheme } from 'shadcn-themes'

function ThemeSwitcher() {
  const { 
    themes,                // All available themes
    currentTheme,          // Currently active theme value (string)
    setTheme               // Function to change theme by value
  } = useTheme()

  return (
    <div>
      <select 
        value={currentTheme} 
        onChange={(e) => setTheme(e.target.value)}
      >
        {themes.map((theme) => (
          <option key={theme.value} value={theme.value}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  )
}`

  const customTrigger = `import { useTheme } from 'shadcn-themes'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

function CustomThemeSwitcher() {
  const { themes, currentTheme, setTheme, getCurrentThemeConfig } = useTheme()
  const currentThemeConfig = getCurrentThemeConfig()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {currentThemeConfig?.name || 'Select Theme'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-2">
          {themes.map((theme) => (
            <Button
              key={theme.value}
              variant={currentTheme === theme.value ? 'default' : 'ghost'}
              onClick={() => setTheme(theme.value)}
              className="justify-start"
            >
              <div 
                className="mr-2 h-4 w-4 rounded-full" 
                style={{ 
                  background: theme.colors.tokens.primary 
                }}
              />
              {theme.name}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}`

  const customAccent = `import { useTheme } from 'shadcn-themes'
import { Slider } from '@/components/ui/slider'

function ThemeEditor() {
  const { customAccent, applyCustomAccent } = useTheme()

  const onHueChange = ([hue]: number[]) => {
    applyCustomAccent(hue, customAccent.chroma)
  }

  const onChromaChange = ([chroma]: number[]) => {
    applyCustomAccent(customAccent.hue, chroma)
  }

  return (
    <div className="space-y-4">
      <div>
        <label>Hue: {customAccent.hue}°</label>
        <Slider
          value={[customAccent.hue]}
          onValueChange={onHueChange}
          min={0}
          max={360}
          step={1}
        />
      </div>
      
      <div>
        <label>Chroma: {customAccent.chroma.toFixed(2)}</label>
        <Slider
          value={[customAccent.chroma]}
          onValueChange={onChromaChange}
          min={0}
          max={0.4}
          step={0.01}
        />
      </div>
    </div>
  )
}`

  const themeGallery = `import { useTheme } from 'shadcn-themes'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function ThemeGallery() {
  const { themes, currentTheme, setTheme } = useTheme()

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {themes.map((theme) => (
        <Card 
          key={theme.value}
          className="cursor-pointer p-4"
          onClick={() => setTheme(theme.value)}
        >
          <div className="mb-2 flex gap-2">
            {Object.entries(theme.colors.tokens)
              .slice(0, 5)
              .map(([key, value]) => (
                <div
                  key={key}
                  className="h-8 w-8 rounded"
                  style={{ background: value }}
                />
              ))}
          </div>
          <h3 className="font-semibold">{theme.name}</h3>
          <p className="text-sm text-muted-foreground">
            {theme.description}
          </p>
          {currentTheme === theme.value && (
            <div className="mt-2 text-xs text-primary">Active</div>
          )}
        </Card>
      ))}
    </div>
  )
}`

  const exportTheme = `import { useTheme } from 'shadcn-themes'
import { Button } from '@/components/ui/button'

function ExportThemeCode() {
  const { getCurrentThemeConfig } = useTheme()

  const exportCode = () => {
    const theme = getCurrentThemeConfig()
    if (!theme) return

    const cssVars = Object.entries(theme.colors.tokens)
      .map(([key, value]) => {
        const cssVar = \`--\${key.replace(/([A-Z])/g, '-$1').toLowerCase()}\`
        return \`  \${cssVar}: \${value};\`
      })
      .join('\\n')

    const code = \`:root {\\n\${cssVars}\\n}\`
    
    navigator.clipboard.writeText(code)
    alert('Theme code copied to clipboard!')
  }

  return (
    <Button onClick={exportCode}>
      Export Current Theme
    </Button>
  )
}`

  const typeScript = `// Types available from your local project
import type { 
  ThemeConfig,      // Theme configuration type
  ThemeTokens,      // Color tokens type
  ThemeTokenKey     // Token keys union
  } from 'shadcn-themes'

// Example: Type-safe theme creation
const myTheme: ThemeConfig = {
  name: 'My Theme',
  value: 'my-theme',
  description: 'A custom theme',
  colors: {
    preview: ['#000', '#111', '#222'],
    tokens: {
      background: 'oklch(0.15 0 0)',
      foreground: 'oklch(0.95 0 0)',
      card: 'oklch(0.17 0 0)',
      cardForeground: 'oklch(0.95 0 0)',
      popover: 'oklch(0.15 0 0)',
      popoverForeground: 'oklch(0.95 0 0)',
      primary: 'oklch(0.65 0.25 265)',
      primaryForeground: 'oklch(0.98 0 0)',
      secondary: 'oklch(0.2 0 0)',
      secondaryForeground: 'oklch(0.95 0 0)',
      muted: 'oklch(0.22 0 0)',
      mutedForeground: 'oklch(0.7 0 0)',
      accent: 'oklch(0.25 0 0)',
      accentForeground: 'oklch(0.95 0 0)',
      destructive: 'oklch(0.5 0.2 25)',
      destructiveForeground: 'oklch(0.98 0 0)',
      border: 'oklch(0.28 0 0)',
      input: 'oklch(0.28 0 0)',
      ring: 'oklch(0.65 0.25 265)',
      sidebar: 'oklch(0.16 0 0)',
      sidebarForeground: 'oklch(0.9 0 0)',
      sidebarPrimary: 'oklch(0.65 0.25 265)',
      sidebarPrimaryForeground: 'oklch(0.98 0 0)',
      sidebarAccent: 'oklch(0.25 0 0)',
      sidebarAccentForeground: 'oklch(0.95 0 0)',
      sidebarBorder: 'oklch(0.24 0 0)',
      sidebarRing: 'oklch(0.65 0.25 265)',
      
    }
  }
}`

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Usage Guide</h1>
        <p className="text-lg text-muted-foreground">
          Learn how to integrate and customize themes in your application with the context-based API.
        </p>
      </div>

      {/* Context Setup */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Setup ThemeProvider</h2>
        <p className="text-muted-foreground">
          Wrap your app with ThemeProvider to enable theme management throughout your component tree.
        </p>
        <CodeBlock code={contextUsage} language="tsx" filename="App.tsx" />
      </div>

      {/* Hook Usage */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Use the useTheme Hook</h2>
        <p className="text-muted-foreground">
          Access themes and theme functions from any component using the useTheme hook.
        </p>
        <CodeBlock code={hookUsage} language="tsx" filename="App.tsx" />
      </div>

      {/* Custom Trigger */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Build Custom Theme Switchers</h2>
        <p className="text-muted-foreground">
          Create your own theme switcher UI using the exposed hooks and utilities.
        </p>
        <CodeBlock code={customTrigger} language="tsx" filename="App.tsx" />
      </div>

      {/* Custom Accent */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Custom Accent Colors</h2>
        <p className="text-muted-foreground">
          Allow users to customize theme accent colors with hue and saturation controls.
        </p>
        <CodeBlock code={customAccent} language="tsx" filename="App.tsx" />
      </div>

      {/* Theme Gallery */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Build a Theme Gallery</h2>
        <p className="text-muted-foreground">Create a visual theme gallery page using the exported themes array.</p>
        <CodeBlock code={themeGallery} language="tsx" filename="App.tsx" />
      </div>

      {/* Export Theme */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">6. Export Theme Code</h2>
        <p className="text-muted-foreground">
          Allow users to export CSS variables for any theme to use in their own projects.
        </p>
        <CodeBlock code={exportTheme} language="tsx" filename="App.tsx" />
      </div>

      {/* TypeScript */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">7. TypeScript Support</h2>
        <p className="text-muted-foreground">All exports are fully typed for a great developer experience.</p>
        <CodeBlock code={typeScript} language="ts" filename="App.tsx" />
      </div>

    </div>
  )
}