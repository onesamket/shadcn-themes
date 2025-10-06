

import { useState } from "react"

import { ThemeCard } from "@/components/theme-card"
import { themes } from "@/constants/themes"
import { applyTheme } from "@/lib/themes"

export function Themes() {
  const [activeTheme, setActiveTheme] = useState("dark")

  const handleThemeChange = (themeValue: string) => {
    const theme = themes.find((t) => t.value === themeValue)
    if (theme) {
      setActiveTheme(themeValue)
      applyTheme(theme)
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Theme Gallery</h1>
        <p className="text-lg text-muted-foreground">
          Explore our collection of {themes.length} professionally designed themes. Click any theme to preview it
          instantly.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.value}
            theme={theme}
            isActive={activeTheme === theme.value}
            onClick={() => handleThemeChange(theme.value)}
          />
        ))}
      </div>
    </div>
  )
}
