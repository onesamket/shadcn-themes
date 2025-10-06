"use client"

import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"
import { Check, Palette, RotateCcw, X, Search, Minimize2, Maximize2 } from "lucide-react"
import { useEffect, useState, useMemo } from "react"
import { createPortal } from "react-dom"
import "./style.css"

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right"

export type ThemeSwitcherProps = {
  /**
   * Whether to render the switcher in a portal (recommended for better positioning)
   * @default true
   */
  usePortal?: boolean

  /**
   * Custom class name for the switcher container
   */
  className?: string

  /**
   * Callback when the switcher is opened
   */
  onOpen?: () => void

  /**
   * Callback when the switcher is closed
   */
  onClose?: () => void
}

/**
 * A floating theme switcher component with a built-in theme editor.
 * Inspired by TanStack devtools with keyboard shortcuts and smooth animations.
 *
 * @example
 * ```tsx
 * <ThemeSwitcher usePortal />
 * ```
 */
export function ThemeSwitcher({ usePortal = true, className, onOpen, onClose }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [activeTab, setActiveTab] = useState<"themes" | "editor" | "settings">("themes")
  const [searchQuery, setSearchQuery] = useState("")

  const {
    floatPosition,
    currentTheme,
    isCustom,
    customAccent,
    setTheme,
    applyCustomAccent,
    resetCustomAccent,
    themes,
    getCurrentThemeConfig,
  } = useTheme()

  const [cornerPosition, setCornerPosition] = useState<Position>(floatPosition)

  useEffect(() => {
    const savedPosition = localStorage.getItem("themePosition") as Position
    if (savedPosition) setCornerPosition(savedPosition)

    // Keyboard shortcut: Ctrl/Cmd + K to toggle
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      // Escape to close
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      onOpen?.()
    } else {
      onClose?.()
    }
  }, [isOpen, onOpen, onClose])

  const handlePositionChange = (position: Position) => {
    setCornerPosition(position)
    localStorage.setItem("themePosition", position)
  }

  const getButtonPosition = () => {
    const offset = 20
    switch (cornerPosition) {
      case "top-left":
        return { top: `${offset}px`, left: `${offset}px` }
      case "top-right":
        return { top: `${offset}px`, right: `${offset}px` }
      case "bottom-left":
        return { bottom: `${offset}px`, left: `${offset}px` }
      case "bottom-right":
        return { bottom: `${offset}px`, right: `${offset}px` }
    }
  }

  const getPanelPosition = () => {
    const offset = 20
    const buttonOffset = 60
    switch (cornerPosition) {
      case "top-left":
        return { top: `${offset}px`, left: `${offset + buttonOffset}px` }
      case "top-right":
        return { top: `${offset}px`, right: `${offset + buttonOffset}px` }
      case "bottom-left":
        return { bottom: `${offset}px`, left: `${offset + buttonOffset}px` }
      case "bottom-right":
        return { bottom: `${offset}px`, right: `${offset + buttonOffset}px` }
    }
  }

  const filteredThemes = useMemo(() => {
    if (!searchQuery.trim()) return themes
    const query = searchQuery.toLowerCase()
    return themes.filter(
      (theme) =>
        theme.name.toLowerCase().includes(query) ||
        theme.description.toLowerCase().includes(query) ||
        theme.value.toLowerCase().includes(query),
    )
  }, [themes, searchQuery])

  const panel = isOpen ? (
    <div className={cn("tsw-panel", className)} style={getPanelPosition()}>
      <div className="tsw-header">
        <div className="tsw-header-left">
          <Palette className="tsw-icon-sm tsw-primary" />
          <span className="tsw-title">Theme Studio</span>
          <span className="tsw-kbd">⌘K</span>
        </div>
        <div className="tsw-header-right">
          <button
            className="tsw-icon-btn"
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? "Maximize" : "Minimize"}
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? <Maximize2 className="tsw-icon-xs" /> : <Minimize2 className="tsw-icon-xs" />}
          </button>
          <button className="tsw-icon-btn" onClick={() => setIsOpen(false)} aria-label="Close" title="Close (Esc)">
            <X className="tsw-icon-xs" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="tsw-tabs">
          <div className="tsw-tabs-list">
            <button
              className={cn("tsw-tab", activeTab === "themes" && "tsw-tab-active")}
              onClick={() => setActiveTab("themes")}
            >
              Themes
            </button>
            <button
              className={cn("tsw-tab", activeTab === "editor" && "tsw-tab-active")}
              onClick={() => setActiveTab("editor")}
            >
              Editor
            </button>
            <button
              className={cn("tsw-tab", activeTab === "settings" && "tsw-tab-active")}
              onClick={() => setActiveTab("settings")}
            >
              Settings
            </button>
          </div>

          {activeTab === "themes" && (
            <div className="tsw-content">
              <div style={{ padding: "12px 16px 0" }}>
                <div style={{ position: "relative" }}>
                  <Search
                    className="tsw-icon-sm"
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--muted-foreground)",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search themes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="tsw-search-input"
                    style={{ paddingLeft: "36px" }}
                  />
                </div>
              </div>

              <div className="tsw-scroll">
                <div className="tsw-stack">
                  {filteredThemes.length === 0 ? (
                    <div
                      style={{
                        padding: "24px",
                        textAlign: "center",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      No themes found
                    </div>
                  ) : (
                    filteredThemes.map((theme) => (
                      <button
                        key={theme.value}
                        onClick={() => setTheme(theme.value)}
                        className={cn(
                          "tsw-theme-btn",
                          currentTheme === theme.value && !isCustom && "tsw-theme-btn-active",
                        )}
                      >
                        <div className="tsw-theme-row">
                          <div className="tsw-theme-info">
                            <div className="tsw-text-sm tsw-font-medium">{theme.name}</div>
                            <div className="tsw-text-xs tsw-muted">{theme.description}</div>
                          </div>
                          {currentTheme === theme.value && !isCustom && (
                            <div className="tsw-selected-dot">
                              <div className="tsw-selected-dot-inner" />
                            </div>
                          )}
                        </div>
                        <div className="tsw-preview-row">
                          {theme.colors.preview.map((color: string, i: number) => (
                            <div key={i} className="tsw-preview-swatch" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "editor" && (
            <div className="tsw-content">
              <div className="tsw-scroll">
                <div className="tsw-stack-lg">
                  <div className="tsw-stack">
                    <label className="tsw-label-xs tsw-muted">Current Theme</label>
                    <div className="tsw-card">
                      <div className="tsw-text-sm tsw-font-medium">
                        {getCurrentThemeConfig()?.name}
                        {isCustom && " (Custom)"}
                      </div>
                    </div>
                  </div>

                  <div className="tsw-stack border-t pt-4">
                    <div className="tsw-row-between">
                      <label className="tsw-label-sm">Custom Accent Color</label>
                      {isCustom && (
                        <button className="tsw-btn-ghost tsw-btn-sm" onClick={resetCustomAccent}>
                          <RotateCcw className="tsw-icon-xs" />
                          <span>Reset</span>
                        </button>
                      )}
                    </div>

                    <div className="tsw-stack">
                      <div className="tsw-row-between">
                        <label className="tsw-label-xs tsw-muted">Hue</label>
                        <span className="tsw-code-xs tsw-muted">{customAccent.hue}°</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={360}
                        step={1}
                        value={customAccent.hue}
                        onChange={(e) => applyCustomAccent(Number(e.target.value), customAccent.chroma)}
                        className="tsw-range"
                      />
                      <div
                        className="tsw-gradient"
                        style={{
                          background: `linear-gradient(to right,
													oklch(0.65 ${customAccent.chroma} 0),
													oklch(0.65 ${customAccent.chroma} 60),
													oklch(0.65 ${customAccent.chroma} 120),
													oklch(0.65 ${customAccent.chroma} 180),
													oklch(0.65 ${customAccent.chroma} 240),
													oklch(0.65 ${customAccent.chroma} 300),
													oklch(0.65 ${customAccent.chroma} 360)
												)`,
                        }}
                      />
                    </div>

                    <div className="tsw-stack">
                      <div className="tsw-row-between">
                        <label className="tsw-label-xs tsw-muted">Saturation</label>
                        <span className="tsw-code-xs tsw-muted">{(customAccent.chroma * 100).toFixed(0)}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={40}
                        step={1}
                        value={customAccent.chroma * 100}
                        onChange={(e) => applyCustomAccent(customAccent.hue, Number(e.target.value) / 100)}
                        className="tsw-range"
                      />
                      <div
                        className="tsw-gradient"
                        style={{
                          background: `linear-gradient(to right,
													oklch(0.65 0 ${customAccent.hue}),
													oklch(0.65 0.1 ${customAccent.hue}),
													oklch(0.65 0.2 ${customAccent.hue}),
													oklch(0.65 0.3 ${customAccent.hue}),
													oklch(0.65 0.4 ${customAccent.hue})
												)`,
                        }}
                      />
                    </div>

                    <div className="tsw-stack">
                      <label className="tsw-label-xs tsw-muted">Preview</label>
                      <div className="tsw-preview-row gap-2">
                        <div
                          className="tsw-preview-box tsw-border-2"
                          style={{
                            backgroundColor: `oklch(0.65 ${customAccent.chroma} ${customAccent.hue})`,
                          }}
                        >
                          <span className="tsw-text-sm tsw-font-medium" style={{ color: "white" }}>
                            Primary
                          </span>
                        </div>
                        <div className="tsw-preview-box tsw-border-2 tsw-bg-card">
                          <button
                            className="tsw-btn"
                            style={{
                              backgroundColor: `oklch(0.65 ${customAccent.chroma} ${customAccent.hue})`,
                              color: "white",
                            }}
                          >
                            Button
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="tsw-content">
              <div className="tsw-scroll">
                <div className="tsw-stack-lg">
                  <div className="tsw-stack">
                    <label className="tsw-label-sm">Position</label>
                    <div className="tsw-grid-2">
                      {(["top-left", "top-right", "bottom-left", "bottom-right"] as Position[]).map((position) => (
                        <button
                          key={position}
                          onClick={() => handlePositionChange(position)}
                          className={cn("tsw-pos-btn", cornerPosition === position && "tsw-pos-btn-active")}
                        >
                          <span className="tsw-text-sm tsw-font-medium">
                            {position
                              .split("-")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(" ")}
                          </span>
                          {cornerPosition === position && <Check className="tsw-icon-sm tsw-primary" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="tsw-stack">
                    <label className="tsw-label-sm">Keyboard Shortcuts</label>
                    <div className="tsw-card">
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span className="tsw-text-sm">Toggle Theme Studio</span>
                          <span className="tsw-kbd">⌘K</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span className="tsw-text-sm">Close Panel</span>
                          <span className="tsw-kbd">Esc</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  ) : null

  return (
    <>
      <div className="tsw-fab" style={getButtonPosition()}>
        <button
          className="tsw-fab-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open theme studio"
          title="Open Theme Studio (⌘K)"
        >
          <Palette className="tsw-icon-md" />
        </button>
      </div>

      {usePortal ? createPortal(panel, document.body) : panel}
    </>
  )
}
