import { CodeBlock } from "@/components/code-block"

export function Installation() {
  const installCode = `bun add shadcn-themes
# or
npm install shadcn-themes
# or
yarn add shadcn-themes
# or
pnpm add shadcn-themes`

  const setupCode = `import { ThemeProvider } from 'shadcn-themes'

function App() {
  return (
    <ThemeProvider 
      defaultTheme="dark"        // Optional: Set default theme
      storageKey="app-theme"     // Optional: localStorage key
    >
      {/* Your app components */}
    </ThemeProvider>
  )
}`

  const cssCode = `@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));
@custom-variant light (&:is(.light *));

/* Default theme variables - will be overridden by theme system */
:root {
  --background: oklch(0.15 0 0);
  --foreground: oklch(0.95 0 0);
  --card: oklch(0.18 0 0);
  --card-foreground: oklch(0.95 0 0);
  --popover: oklch(0.18 0 0);
  --popover-foreground: oklch(0.95 0 0);
  --primary: oklch(0.65 0.25 265);
  --primary-foreground: oklch(0.98 0 0);
  --secondary: oklch(0.25 0 0);
  --secondary-foreground: oklch(0.95 0 0);
  --muted: oklch(0.25 0 0);
  --muted-foreground: oklch(0.55 0 0);
  --accent: oklch(0.25 0 0);
  --accent-foreground: oklch(0.95 0 0);
  --destructive: oklch(0.55 0.22 25);
  --destructive-foreground: oklch(0.98 0 0);
  --border: oklch(0.25 0 0);
  --input: oklch(0.25 0 0);
  --ring: oklch(0.65 0.25 265);
  --radius: 0.75rem;
  --sidebar: oklch(0.13 0 0);
  --sidebar-foreground: oklch(0.75 0 0);
  --sidebar-primary: oklch(0.65 0.25 265);
  --sidebar-primary-foreground: oklch(0.98 0 0);
  --sidebar-accent: oklch(0.2 0 0);
  --sidebar-accent-foreground: oklch(0.95 0 0);
  --sidebar-border: oklch(0.2 0 0);
  --sidebar-ring: oklch(0.65 0.25 265);
}

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`

  const floatingCode = `import { ThemeProvider, ThemeSwitcher } from 'shadcn-themes'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      {/* Your app components */}
      
      {/* Optional: Add floating theme switcher */}
      <ThemeSwitcher />
    </ThemeProvider>
  )
}`

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Installation</h1>
        <p className="text-lg text-muted-foreground">Get started with shadcn themes in minutes.</p>
      </div>

      {/* Step 1 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Install the package</h2>
        <CodeBlock code={installCode} language="bash" filename="install.sh" />
      </div>

      {/* Step 2 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Setup your CSS</h2>
        <p className="text-muted-foreground">
          Add the base theme tokens to your globals.css file. These will be dynamically overridden when themes are
          applied.
        </p>
        <CodeBlock code={cssCode} language="css" filename="globals.css" />
      </div>

      {/* Step 3 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Add ThemeProvider</h2>
        <p className="text-muted-foreground">
          Wrap your app with ThemeProvider to enable theme management. The provider accepts optional props for default
          theme and storage key.
        </p>
        <CodeBlock code={setupCode} language="typescript" filename="App.tsx" />
      </div>

      {/* Step 4 */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Optional: Add Floating Switcher</h2>
        <p className="text-muted-foreground">
          Include the FloatingThemeSwitcher component for a ready-to-use theme switcher, or build your own using the
          useTheme hook.
        </p>
        <CodeBlock code={floatingCode} language="typescript" filename="App.tsx" />
      </div>
    </div>
  )
}
