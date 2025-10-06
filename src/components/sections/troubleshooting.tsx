"use client"

import { AlertCircle, CheckCircle2, Info } from "lucide-react"

export function Troubleshooting() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Troubleshooting</h1>
        <p className="text-lg text-muted-foreground">Common issues and solutions when working with shadcn themes.</p>
      </div>

      {/* Theme not applying */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Theme not applying</h2>

        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-destructive">Problem</h4>
              <p className="text-sm text-muted-foreground">
                Theme changes don't reflect in the UI or colors remain default.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-primary/50 bg-primary/10 p-4">
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-primary">Solution</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>1. Ensure CSS variables are properly defined in your globals.css</li>
                <li>2. Check that ThemeProvider wraps your entire app</li>
                <li>3. Verify Tailwind is configured to use the CSS variables</li>
                <li>4. Make sure you're using the correct color classes (e.g., bg-background, text-foreground)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* TypeScript errors */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">TypeScript errors</h2>

        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-destructive">Problem</h4>
              <p className="text-sm text-muted-foreground">Type errors when importing or using theme types.</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-primary/50 bg-primary/10 p-4">
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-primary">Solution</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>1. Ensure you're importing types from the correct path</li>
                <li>2. Check that your tsconfig.json includes the package</li>
                <li>3. Try restarting your TypeScript server</li>
                <li>4. Verify you're using the latest version of the package</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Floating switcher not visible */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Floating switcher not visible</h2>

        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-destructive">Problem</h4>
              <p className="text-sm text-muted-foreground">ThemeSwitcher component doesn't appear on the page.</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-primary/50 bg-primary/10 p-4">
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-primary">Solution</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>1. Check that ThemeSwitcher is rendered inside ThemeProvider</li>
                <li>2. Verify z-index conflicts with other fixed/absolute elements</li>
                <li>3. Ensure the switcher CSS is imported</li>
                <li>4. Try using usePortal=true prop for better positioning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Custom themes not working */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom themes not working</h2>

        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-destructive">Problem</h4>
              <p className="text-sm text-muted-foreground">Custom theme configurations don't apply correctly.</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-primary/50 bg-primary/10 p-4">
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-primary">Solution</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>1. Verify your custom theme follows the ThemeConfig type structure</li>
                <li>2. Ensure all required token keys are present</li>
                <li>3. Check that OKLCH color values are properly formatted</li>
                <li>4. Pass custom themes array to ThemeProvider themes prop</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Performance issues */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Performance issues</h2>

        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-destructive">Problem</h4>
              <p className="text-sm text-muted-foreground">Theme switching causes lag or janky animations.</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-primary/50 bg-primary/10 p-4">
          <div className="flex gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-primary">Solution</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>1. Enable disableTransitionOnChange prop to skip CSS transitions</li>
                <li>2. Reduce the number of theme-dependent elements</li>
                <li>3. Use CSS containment for better performance</li>
                <li>4. Consider lazy loading the ThemeSwitcher component</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Best Practices</h2>

        <div className="rounded-lg border border-blue-500/50 bg-blue-500/10 p-4">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-blue-500" />
            <div className="flex-1 space-y-2">
              <h4 className="font-semibold text-blue-500">Tips</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Always wrap your app with ThemeProvider at the root level</li>
                <li>• Use semantic color tokens (background, foreground, etc.) instead of hardcoded colors</li>
                <li>• Test your themes in both light and dark modes for accessibility</li>
                <li>• Keep custom themes in a separate file for better organization</li>
                <li>• Use the theme editor to fine-tune accent colors before exporting</li>
                <li>• Enable system theme detection for better user experience</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
