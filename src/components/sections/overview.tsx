"use client"

import { Palette, Zap, Sparkles, Code2, Layers, Settings } from "lucide-react"

export function Overview() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-4">
        <h1 className="text-balance text-5xl font-bold tracking-tight lg:text-6xl">Beautiful themes for shadcn/ui</h1>
        <p className="text-pretty text-xl text-muted-foreground lg:text-2xl">
          A comprehensive theme library with 30+ pre-built themes using the OKLCH color space. Context-based, fully
          type-safe, and production-ready.
        </p>
      </div>

      {/* Features */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-3 rounded-lg border bg-card p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Palette className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">30+ Themes</h3>
          <p className="text-sm text-muted-foreground">
            From classic dark and light themes to app-inspired designs like GitHub, VS Code, Dracula, and more.
          </p>
        </div>

        <div className="space-y-3 rounded-lg border bg-card p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">OKLCH Colors</h3>
          <p className="text-sm text-muted-foreground">
            Built with the modern OKLCH color space for perceptually uniform colors and better accessibility.
          </p>
        </div>

        <div className="space-y-3 rounded-lg border bg-card p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Theme Editor</h3>
          <p className="text-sm text-muted-foreground">
            Customize hue and saturation with built-in theme editor. Create your perfect color palette in real-time.
          </p>
        </div>

        <div className="space-y-3 rounded-lg border bg-card p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Code2 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Context-Based API</h3>
          <p className="text-sm text-muted-foreground">
            Use ThemeProvider and useTheme hook to access themes anywhere in your component tree.
          </p>
        </div>

        <div className="space-y-3 rounded-lg border bg-card p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Layers className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Fully Type-Safe</h3>
          <p className="text-sm text-muted-foreground">
            Complete TypeScript support with exported types for themes, colors, and custom configurations.
          </p>
        </div>

        <div className="space-y-3 rounded-lg border bg-card p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Settings className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Flexible Integration</h3>
          <p className="text-sm text-muted-foreground">
            Use the floating switcher or build custom theme UIs with exposed hooks and utilities.
          </p>
        </div>
      </div>

      {/* Quick Start */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Quick Start</h2>
        <div className="space-y-4 rounded-lg border bg-card p-6">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Install the package</p>
            <pre className="overflow-x-auto rounded bg-muted p-3">
              <code className="text-sm">npm install shadcn-themes</code>
            </pre>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Wrap your app with ThemeProvider</p>
            <pre className="overflow-x-auto rounded bg-muted p-3">
              <code className="text-sm">{`import { ThemeProvider } from 'shadcn-themes'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      {/* Your app */}
    </ThemeProvider>
  )
}`}</code>
            </pre>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Use themes anywhere</p>
            <pre className="overflow-x-auto rounded bg-muted p-3">
              <code className="text-sm">{`import { useTheme } from 'shadcn-themes'

function ThemeSwitcher() {
  const { themes, setTheme } = useTheme()
  
  return (
    <select onChange={(e) => setTheme(e.target.value)}>
      {themes.map(theme => (
        <option key={theme.value} value={theme.value}>
          {theme.name}
        </option>
      ))}
    </select>
  )
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Key Features</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-4">
            <h4 className="mb-2 font-semibold">Export Theme Code</h4>
            <p className="text-sm text-muted-foreground">
              Copy CSS variables for any theme to use in your own projects or customize further.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h4 className="mb-2 font-semibold">Custom Accents</h4>
            <p className="text-sm text-muted-foreground">
              Adjust hue and saturation with visual sliders to create unique color variations.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h4 className="mb-2 font-semibold">Persistent Settings</h4>
            <p className="text-sm text-muted-foreground">
              Theme preferences and custom colors are automatically saved to localStorage.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h4 className="mb-2 font-semibold">Floating Switcher</h4>
            <p className="text-sm text-muted-foreground">
              Optional floating theme switcher with draggable positioning and minimize controls.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
