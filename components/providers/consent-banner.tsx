'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { setAnalyticsConsent, getAnalyticsConsent } from '@/lib/analytics'
import { X, Settings, Shield } from 'lucide-react'

export function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [consent, setConsent] = useState({
    analytics: false,
    marketing: false,
    functional: true, // Always true for essential functionality
  })

  useEffect(() => {
    // Check if user has already given consent
    const existingConsent = getAnalyticsConsent()
    if (!existingConsent) {
      setShowBanner(true)
    } else {
      setConsent(existingConsent)
    }
  }, [])

  const handleAcceptAll = () => {
    const fullConsent = {
      analytics: true,
      marketing: true,
      functional: true,
    }
    setAnalyticsConsent(fullConsent)
    setConsent(fullConsent)
    setShowBanner(false)
    setShowSettings(false)
  }

  const handleRejectAll = () => {
    const minimalConsent = {
      analytics: false,
      marketing: false,
      functional: true,
    }
    setAnalyticsConsent(minimalConsent)
    setConsent(minimalConsent)
    setShowBanner(false)
    setShowSettings(false)
  }

  const handleSavePreferences = () => {
    setAnalyticsConsent(consent)
    setShowBanner(false)
    setShowSettings(false)
  }

  const handleConsentChange = (type: keyof typeof consent, value: boolean) => {
    setConsent(prev => ({
      ...prev,
      [type]: value,
    }))
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="container mx-auto">
        {!showSettings ? (
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6">
              <div className="flex items-start gap-3 flex-1">
                <Shield className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-2">
                  <CardTitle className="text-lg">We value your privacy</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    We use cookies and similar technologies to improve your experience, analyze site usage, 
                    and assist in our marketing efforts. You can manage your preferences or learn more in our{' '}
                    <a href="/privacy-policy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>.
                  </CardDescription>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="w-full sm:w-auto"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Customize
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRejectAll}
                  className="w-full sm:w-auto"
                >
                  Reject All
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto"
                >
                  Accept All
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle className="text-lg">Cookie Preferences</CardTitle>
                <CardDescription>
                  Choose which cookies you want to allow. You can change these settings at any time.
                </CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {/* Essential Cookies */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="functional"
                    checked={consent.functional}
                    disabled={true}
                    className="mt-1"
                  />
                  <div className="space-y-1 flex-1">
                    <label htmlFor="functional" className="text-sm font-medium leading-none">
                      Essential Cookies
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Required for the website to function properly. These cannot be disabled.
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="analytics"
                    checked={consent.analytics}
                    onCheckedChange={(checked) => 
                      handleConsentChange('analytics', checked as boolean)
                    }
                    className="mt-1"
                  />
                  <div className="space-y-1 flex-1">
                    <label htmlFor="analytics" className="text-sm font-medium leading-none">
                      Analytics Cookies
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Help us understand how visitors interact with our website by collecting 
                      and reporting information anonymously.
                    </p>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="marketing"
                    checked={consent.marketing}
                    onCheckedChange={(checked) => 
                      handleConsentChange('marketing', checked as boolean)
                    }
                    className="mt-1"
                  />
                  <div className="space-y-1 flex-1">
                    <label htmlFor="marketing" className="text-sm font-medium leading-none">
                      Marketing Cookies
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Used to track visitors across websites to display relevant advertisements 
                      and measure campaign effectiveness.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRejectAll}
                  className="w-full sm:w-auto"
                >
                  Reject All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAcceptAll}
                  className="w-full sm:w-auto"
                >
                  Accept All
                </Button>
                <Button
                  size="sm"
                  onClick={handleSavePreferences}
                  className="w-full sm:w-auto"
                >
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}