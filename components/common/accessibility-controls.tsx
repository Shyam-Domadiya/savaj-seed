"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  Accessibility, 
  Type, 
  Contrast, 
  Eye, 
  MousePointer,
  Keyboard,
  Volume2,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AccessibilitySettings {
  fontSize: number
  highContrast: boolean
  reducedMotion: boolean
  focusIndicators: boolean
  screenReaderMode: boolean
  keyboardNavigation: boolean
  soundEffects: boolean
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  highContrast: false,
  reducedMotion: false,
  focusIndicators: true,
  screenReaderMode: false,
  keyboardNavigation: true,
  soundEffects: false,
}

export function AccessibilityControls() {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [isOpen, setIsOpen] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsed })
      } catch (error) {
        console.warn('Failed to parse accessibility settings:', error)
      }
    }
  }, [])

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement

    // Font size
    root.style.fontSize = `${settings.fontSize}%`

    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }

    // Enhanced focus indicators
    if (settings.focusIndicators) {
      root.classList.add('enhanced-focus')
    } else {
      root.classList.remove('enhanced-focus')
    }

    // Screen reader mode
    if (settings.screenReaderMode) {
      root.classList.add('screen-reader-mode')
    } else {
      root.classList.remove('screen-reader-mode')
    }

    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings))
  }, [settings])

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const resetSettings = () => {
    setSettings(defaultSettings)
    localStorage.removeItem('accessibility-settings')
  }

  return (
    <>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-background/80 backdrop-blur-sm"
            aria-label="Open accessibility controls"
          >
            <Accessibility className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-80 p-0" 
          align="end" 
          side="top"
          sideOffset={8}
        >
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5" />
                Accessibility Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Font Size */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Type className="h-4 w-4" />
                  Font Size: {settings.fontSize}%
                </Label>
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={([value]) => updateSetting('fontSize', value)}
                  min={75}
                  max={150}
                  step={5}
                  className="w-full"
                  aria-label="Adjust font size"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Small</span>
                  <span>Normal</span>
                  <span>Large</span>
                </div>
              </div>

              <Separator />

              {/* Visual Settings */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Visual Settings
                </h4>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-contrast" className="text-sm">
                    High Contrast Mode
                  </Label>
                  <Switch
                    id="high-contrast"
                    checked={settings.highContrast}
                    onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                    aria-describedby="high-contrast-desc"
                  />
                </div>
                <p id="high-contrast-desc" className="text-xs text-muted-foreground">
                  Increases contrast for better visibility
                </p>

                <div className="flex items-center justify-between">
                  <Label htmlFor="reduced-motion" className="text-sm">
                    Reduce Motion
                  </Label>
                  <Switch
                    id="reduced-motion"
                    checked={settings.reducedMotion}
                    onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                    aria-describedby="reduced-motion-desc"
                  />
                </div>
                <p id="reduced-motion-desc" className="text-xs text-muted-foreground">
                  Minimizes animations and transitions
                </p>
              </div>

              <Separator />

              {/* Navigation Settings */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <MousePointer className="h-4 w-4" />
                  Navigation Settings
                </h4>

                <div className="flex items-center justify-between">
                  <Label htmlFor="focus-indicators" className="text-sm">
                    Enhanced Focus Indicators
                  </Label>
                  <Switch
                    id="focus-indicators"
                    checked={settings.focusIndicators}
                    onCheckedChange={(checked) => updateSetting('focusIndicators', checked)}
                    aria-describedby="focus-indicators-desc"
                  />
                </div>
                <p id="focus-indicators-desc" className="text-xs text-muted-foreground">
                  Makes focus outlines more visible
                </p>

                <div className="flex items-center justify-between">
                  <Label htmlFor="keyboard-nav" className="text-sm">
                    <Keyboard className="h-4 w-4 inline mr-1" />
                    Keyboard Navigation
                  </Label>
                  <Switch
                    id="keyboard-nav"
                    checked={settings.keyboardNavigation}
                    onCheckedChange={(checked) => updateSetting('keyboardNavigation', checked)}
                    aria-describedby="keyboard-nav-desc"
                  />
                </div>
                <p id="keyboard-nav-desc" className="text-xs text-muted-foreground">
                  Enables enhanced keyboard navigation
                </p>
              </div>

              <Separator />

              {/* Screen Reader Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="screen-reader" className="text-sm">
                    Screen Reader Mode
                  </Label>
                  <Switch
                    id="screen-reader"
                    checked={settings.screenReaderMode}
                    onCheckedChange={(checked) => updateSetting('screenReaderMode', checked)}
                    aria-describedby="screen-reader-desc"
                  />
                </div>
                <p id="screen-reader-desc" className="text-xs text-muted-foreground">
                  Optimizes interface for screen readers
                </p>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sound-effects" className="text-sm">
                    <Volume2 className="h-4 w-4 inline mr-1" />
                    Sound Effects
                  </Label>
                  <Switch
                    id="sound-effects"
                    checked={settings.soundEffects}
                    onCheckedChange={(checked) => updateSetting('soundEffects', checked)}
                    aria-describedby="sound-effects-desc"
                  />
                </div>
                <p id="sound-effects-desc" className="text-xs text-muted-foreground">
                  Adds audio feedback for interactions
                </p>
              </div>

              <Separator />

              {/* Reset Button */}
              <Button
                variant="outline"
                onClick={resetSettings}
                className="w-full"
                aria-label="Reset all accessibility settings to default"
              >
                Reset to Defaults
              </Button>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>

      {/* Add CSS for accessibility classes */}
      <style jsx global>{`
        .high-contrast {
          filter: contrast(150%) brightness(1.2);
        }
        
        .high-contrast * {
          text-shadow: none !important;
          box-shadow: none !important;
        }
        
        .reduce-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
        
        .enhanced-focus *:focus {
          outline: 3px solid hsl(var(--primary)) !important;
          outline-offset: 2px !important;
          box-shadow: 0 0 0 5px hsla(var(--primary), 0.3) !important;
        }
        
        .screen-reader-mode .sr-only {
          position: static !important;
          width: auto !important;
          height: auto !important;
          padding: 0.25rem !important;
          margin: 0 !important;
          overflow: visible !important;
          clip: auto !important;
          white-space: normal !important;
          background: hsl(var(--muted));
          border: 1px solid hsl(var(--border));
          border-radius: 0.25rem;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .reduce-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        
        @media (prefers-contrast: high) {
          :root {
            --background: 0 0% 100%;
            --foreground: 0 0% 0%;
            --border: 0 0% 50%;
          }
        }
      `}</style>
    </>
  )
}