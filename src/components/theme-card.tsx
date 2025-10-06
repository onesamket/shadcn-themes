"use client"


import type { ThemeConfig } from "@/types/theme"
import { cn } from "@/lib/utils"
import { Check, Code2, Copy } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"

interface ThemeCardProps {
  theme: ThemeConfig
  isActive: boolean
  onClick: () => void
}

export function ThemeCard({ theme, isActive, onClick }: ThemeCardProps) {
  const [showCodeDialog, setShowCodeDialog] = useState(false)

  const generateThemeCode = () => {
    const tokens = theme.colors.tokens
    const lines: string[] = []

    lines.push(`.${theme.value} {`)
    Object.entries(tokens).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
      lines.push(`  ${cssVar}: ${value};`)
    })
    lines.push(`}`)

    return lines.join("\n")
  }

  const copyThemeCode = async () => {
    const code = generateThemeCode()
    await navigator.clipboard.writeText(code)
  }

  return (
    <>
      <Card
        className={cn(
          "cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg",
          isActive && "border-primary bg-primary/5 shadow-md",
        )}
        onClick={onClick}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg">{theme.name}</CardTitle>
              <CardDescription className="mt-1">{theme.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowCodeDialog(true)
                }}
              >
                <Code2 className="h-4 w-4" />
              </Button>
              {isActive && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex gap-2">
              {theme.colors.preview.map((color, i) => (
                <div
                  key={i}
                  className="h-12 flex-1 rounded transition-transform duration-300 hover:scale-105"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              onClick={(e) => {
                e.stopPropagation()
                setShowCodeDialog(true)
              }}
            >
              Show Code
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showCodeDialog} onOpenChange={setShowCodeDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{theme.name} - CSS Variables</DialogTitle>
            <DialogDescription>
              Copy and use these CSS variables in your project
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <pre className="text-xs overflow-x-auto rounded bg-muted p-4">
              <code>{generateThemeCode()}</code>
            </pre>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={copyThemeCode}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowCodeDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}