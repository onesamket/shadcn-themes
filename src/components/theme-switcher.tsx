"use client"
import { useState, useEffect } from "react"
import { Palette, X, Check, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { ScrollArea } from "./ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Label } from "./ui/label"
import { Slider } from "./ui/slider"
import { useTheme } from "@/hooks/use-theme"


type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right"

export function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false)
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

    return (
        <>
            {/* Floating Button */}
            <div className="fixed z-50 transition-all duration-300 ease-out" style={getButtonPosition()}>
                <Button
                    size="icon"
                    className="h-12 w-12 rounded-full shadow-lg transition-transform hover:scale-110"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Palette className="h-5 w-5" />
                </Button>
            </div>

            {/* Theme Switcher Panel */}
            {isOpen && (
                <Card
                    className={cn(
                        "fixed z-50 w-[420px] shadow-2xl transition-all duration-300 ease-out",
                        "h-[600px]",
                    )}
                    style={getPanelPosition()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b bg-card p-3 shadow-2xl">
                        <div className="flex items-center gap-2">
                            <Palette className="h-4 w-4 text-primary" />
                            <span className="text-sm font-semibold">Theme Studio</span>
                        </div>
                        <div className="flex items-center gap-1">

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 transition-transform hover:scale-110"
                                onClick={() => setIsOpen(false)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    </div>

                    {/* Content */}
                    (
                    <Tabs defaultValue="themes" className="h-[600px] rounded-2xl">
                        <TabsList className="w-full rounded-none border-b">
                            <TabsTrigger value="themes" className="flex-1">
                                Themes
                            </TabsTrigger>
                            <TabsTrigger value="editor" className="flex-1">
                                Editor
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="flex-1">
                                Settings
                            </TabsTrigger>
                        </TabsList>

                        {/* Themes Tab */}
                        <TabsContent value="themes" className="h-[calc(100%-40px)] m-0">
                            <ScrollArea className="h-full">
                                <div className="space-y-2 p-4 shadow-2xl">
                                    {themes.map((theme) => (
                                        <button
                                            key={theme.value}
                                            onClick={() => setTheme(theme.value)}
                                            className={cn(
                                                "w-full rounded-lg border p-3 text-left transition-all duration-200 hover:border-primary/50 hover:shadow-md",
                                                currentTheme === theme.value && !isCustom && "border-primary bg-primary/5",
                                            )}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium">{theme.name}</div>
                                                    <div className="mt-1 text-xs text-muted-foreground">{theme.description}</div>
                                                </div>
                                                {currentTheme === theme.value && !isCustom && (
                                                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary transition-transform">
                                                        <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-3 flex gap-1.5">
                                                {theme.colors.preview.map((color, i) => (
                                                    <div
                                                        key={i}
                                                        className="h-6 flex-1 rounded transition-transform hover:scale-105"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>

                        {/* Editor Tab */}
                        <TabsContent value="editor" className="h-[calc(100%-40px)] m-0">
                            <ScrollArea className="h-full">
                                <div className="space-y-6 p-4">
                                    {/* Current Theme Display */}
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground">Current Theme</Label>
                                        <div className="rounded-lg border bg-card p-3">
                                            <div className="text-sm font-medium">
                                                {getCurrentThemeConfig()?.name}
                                                {isCustom && " (Custom)"}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Custom Accent Color */}
                                    <div className="space-y-4 border-t pt-4">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-sm font-medium">Custom Accent Color</Label>
                                            {isCustom && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={resetCustomAccent}
                                                    className="h-8 gap-2 transition-transform hover:scale-105"
                                                >
                                                    <RotateCcw className="h-3 w-3" />
                                                    Reset
                                                </Button>
                                            )}
                                        </div>

                                        {/* Hue Slider */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-xs text-muted-foreground">Hue</Label>
                                                <span className="font-mono text-xs text-muted-foreground">{customAccent.hue}°</span>
                                            </div>
                                            <Slider
                                                value={[customAccent.hue]}
                                                onValueChange={([value]) => applyCustomAccent(value, customAccent.chroma)}
                                                min={0}
                                                max={360}
                                                step={1}
                                                className="w-full"
                                            />
                                            <div
                                                className="h-8 rounded-md transition-all"
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

                                        {/* Chroma (Saturation) Slider */}
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-xs text-muted-foreground">Saturation</Label>
                                                <span className="font-mono text-xs text-muted-foreground">
                                                    {(customAccent.chroma * 100).toFixed(0)}%
                                                </span>
                                            </div>
                                            <Slider
                                                value={[customAccent.chroma * 100]}
                                                onValueChange={([value]) => applyCustomAccent(customAccent.hue, value / 100)}
                                                min={0}
                                                max={40}
                                                step={1}
                                                className="w-full"
                                            />
                                            <div
                                                className="h-8 rounded-md transition-all"
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

                                        {/* Preview */}
                                        <div className="space-y-2">
                                            <Label className="text-xs text-muted-foreground">Preview</Label>
                                            <div className="flex gap-2">
                                                <div
                                                    className="flex h-16 flex-1 items-center justify-center rounded-lg border-2 border-border transition-all"
                                                    style={{
                                                        backgroundColor: `oklch(0.65 ${customAccent.chroma} ${customAccent.hue})`,
                                                    }}
                                                >
                                                    <span className="text-sm font-medium text-white">Primary</span>
                                                </div>
                                                <div className="flex h-16 flex-1 items-center justify-center rounded-lg border-2 bg-card">
                                                    <Button
                                                        className="transition-transform hover:scale-105"
                                                        style={{
                                                            backgroundColor: `oklch(0.65 ${customAccent.chroma} ${customAccent.hue})`,
                                                            color: "white",
                                                        }}
                                                    >
                                                        Button
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                        </TabsContent>

                        {/* Settings Tab */}
                        <TabsContent value="settings" className="h-[calc(100%-40px)] m-0">
                            <div className="space-y-6 p-4">
                                <div className="space-y-3">
                                    <Label className="text-sm font-medium">Position</Label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {(["top-left", "top-right", "bottom-left", "bottom-right"] as Position[]).map((position) => (
                                            <button
                                                key={position}
                                                onClick={() => handlePositionChange(position)}
                                                className={cn(
                                                    "flex items-center justify-between rounded-lg border-2 p-3 text-left transition-all duration-200 hover:border-primary/50",
                                                    cornerPosition === position && "border-primary bg-primary/5",
                                                )}
                                            >
                                                <span className="text-sm font-medium capitalize">{position.replace("-", " ")}</span>
                                                {cornerPosition === position && <Check className="h-4 w-4 text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2 border-t pt-4">
                                    <Label className="text-sm font-medium">About</Label>
                                    <div className="rounded-lg border bg-card p-3 text-xs text-muted-foreground">
                                        <p>Theme Studio v1.0</p>
                                        <p className="mt-1">30+ themes with OKLCH color space</p>
                                        <p className="mt-1">Custom accent color support</p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                    )
                </Card>
            )}
        </>
    )
}
