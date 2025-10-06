"use client"

import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"
import { Check, Palette, RotateCcw, X } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import "./style.css"

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right"

type ThemeSwitcherProps = {
    usePortal?: boolean
}

export function ThemeSwitcher({ usePortal = true }: ThemeSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [activeTab, setActiveTab] = useState<"themes" | "editor" | "settings">("themes")

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
    }, [])

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

    const panel = isOpen ? (
        <div className="tsw-panel" style={getPanelPosition()}>
            <div className="tsw-header">
                <div className="tsw-header-left">
                    <Palette className="tsw-icon-sm tsw-primary" />
                    <span className="tsw-title">Theme Studio</span>
                </div>
                <div className="tsw-header-right">
                    <button className="tsw-icon-btn" onClick={() => setIsOpen(false)} aria-label="Close">
                        <X className="tsw-icon-xs" />
                    </button>
                </div>
            </div>

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
                        <div className="tsw-scroll">
                            <div className="tsw-stack">
                                {themes.map((theme) => (
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
                                ))}
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
                        <div className="tsw-stack-lg">
                            <div className="tsw-stack">
                                <label className="tsw-label-sm">Position</label>
                                <div className="tsw-grid-2">
                                    {(["top-left", "top-right", "bottom-left", "bottom-right"] as Position[]).map((position) => (
                                        <button
                                            key={position}
                                            onClick={() => handlePositionChange(position)}
                                            className={cn(
                                                "tsw-pos-btn",
                                                cornerPosition === position && "tsw-pos-btn-active",
                                            )}
                                        >
                                            <span className="tsw-text-sm tsw-font-medium">
                                                {position.replace("-", " ")}
                                            </span>
                                            {cornerPosition === position && <Check className="tsw-icon-sm tsw-primary" />}
                                        </button>
                                    ))}
                                </div>
                            </div>


                        </div>
                    </div>
                )}
            </div>
        </div>
    ) : null

    return (
        <>
            <div className="tsw-fab" style={getButtonPosition()}>
                <button className="tsw-fab-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Open theme studio">
                    <Palette className="tsw-icon-md" />
                </button>
            </div>

            {usePortal ? createPortal(panel, document.body) : panel}
        </>
    )
}