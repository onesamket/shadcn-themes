
import { useState } from "react"
import { Sidebar } from "./components/sidebar"
import { Overview } from "./components/sections/overview"
import { Themes } from "./components/sections/themes"
import { Installation } from "./components/sections/installation"
import { Usage } from "./components/sections/usage"
import { ThemeProvider } from "./components/contexts/theme-provider"
import { ThemeSwitcher } from "./components/theme-switcher"

function App() {
  const [activeSection, setActiveSection] = useState("overview")

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <Overview />
      case "themes":
        return <Themes />
      case "installation":
        return <Installation />
      case "usage":
        return <Usage />
      default:
        return <Overview />
    }
  }

  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="shadcn-theme"
      enableFloatingSwitcher={true}
      floatPosition="bottom-right"
      enableSystem={false}
      onThemeChange={(theme) => console.log(" Theme changed to:", theme)}
    >
      <div className="flex min-h-screen">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 lg:pl-64">
          <div className="mx-auto max-w-5xl px-6 py-12 lg:px-12 lg:py-16">{renderSection()}</div>
        </main>
        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  )
}

export default App
