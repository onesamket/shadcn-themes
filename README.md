# 🧩 shadcn Themes

A comprehensive, context-based theme library for **shadcn/ui** with **30+ pre-built themes** using the **OKLCH color space**.

---

## ✨ Features

- 🎨 **30+ pre-made themes** – from classic dark/light to app-inspired designs (GitHub, VS Code, Dracula, etc.)
- 🌈 **OKLCH colors** – modern color space for perceptually uniform colors and better accessibility
- ⚙️ **Context-based API** – use `ThemeProvider` and `useTheme` for seamless integration
- 🧠 **Fully type-safe** – complete TypeScript support with exported types
- 🧩 **Customizable** – built-in theme editor with hue/saturation controls
- 🧘 **Flexible** – use a floating switcher or build custom theme UIs
- 💾 **Persistent** – automatic `localStorage` support for theme preferences
- 📤 **Exportable** – copy theme CSS variables for any theme

---

## First Step

Initialize a shadcn/ui Project

## 📦 Installation

```bash
npm install shadcn-themes
# or
pnpm add shadcn-themes
# or
yarn add shadcn-themes
```

---

## ⚡ Quick Start

### 1️⃣ Setup `ThemeProvider`

Wrap your app:

```tsx
import { ThemeProvider } from "shadcn-themes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

---

### 2️⃣ Use the `useTheme` Hook

Access themes anywhere:

```tsx
import { useTheme } from "shadcn-themes";

function ThemeSwitcher() {
  const { themes, currentTheme, setTheme } = useTheme();

  return (
    <select
      value={currentTheme?.value ?? ""}
      onChange={(e) => setTheme(e.target.value)}
    >
      {themes.map((theme) => (
        <option key={theme.value} value={theme.value}>
          {theme.name}
        </option>
      ))}
    </select>
  );
}
```

---

### 3️⃣ Optional: Floating Switcher

Drop-in floating theme switcher:

```tsx
import { ThemeProvider, ThemeSwitcher } from "shadcn-themes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="app-theme">
      {/* Your app */}
      <ThemeSwitcher />
    </ThemeProvider>
  );
}
```

---

## 🎨 Available Themes

**Classic:**
Dark, Light, Midnight, Ocean, Forest, Sunset, Rose, Amber, Violet, Slate, Emerald, Sky, Crimson

**App-inspired:**
VS Code, Slack, X (Twitter), GitHub Dark, GitHub Light, Discord, Notion, Linear, Spotify, Dracula, Nord, Solarized Light, Monokai, Jira Dark, Trello Dark

---

## 🧰 API Reference

### `<ThemeProvider />`

```tsx
<ThemeProvider defaultTheme="dark" storageKey="app-theme">
  {children}
</ThemeProvider>
```

---

## 🔧 Advanced Usage

### 🧱 Build a Custom Switcher

```tsx
import { useTheme } from "shadcn-themes";
import { Button } from "@/components/ui/button";

function CustomThemeSwitcher() {
  const { themes, currentTheme, setTheme } = useTheme();

  return (
    <div className="grid gap-2">
      {themes.map((theme) => (
        <Button
          key={theme.value}
          variant={currentTheme?.value === theme.value ? "default" : "ghost"}
          onClick={() => setTheme(theme.value)}
        >
          {theme.name}
        </Button>
      ))}
    </div>
  );
}
```

---

### 🎛️ Custom Accent Controls

```tsx
import { useTheme } from "shadcn-themes";
import { Slider } from "@/components/ui/slider";

function ThemeEditor() {
  const { customTheme, setCustomTheme } = useTheme();

  return (
    <div className="space-y-4">
      <div>
        <label>Hue: {customTheme.hue}°</label>
        <Slider
          value={[customTheme.hue]}
          onValueChange={([hue]) => setCustomTheme({ ...customTheme, hue })}
          min={0}
          max={360}
        />
      </div>
      {/* Add controls for saturation/brightness if desired */}
    </div>
  );
}
```

---

## 🤝 Contributing

Contributions are welcome!
Open an issue or submit a pull request on GitHub.

---

## 📄 License

**MIT**

---
