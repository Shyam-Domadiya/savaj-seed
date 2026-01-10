"use client"

import { useEffect, useRef, ReactNode } from "react"

interface FocusTrapProps {
  children: ReactNode
  active?: boolean
  restoreFocus?: boolean
  className?: string
}

export function FocusTrap({ 
  children, 
  active = true, 
  restoreFocus = true,
  className 
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active) return

    // Store the currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement

    const container = containerRef.current
    if (!container) return

    // Get all focusable elements within the container
    const getFocusableElements = () => {
      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]',
        'audio[controls]',
        'video[controls]',
        'iframe',
        'object',
        'embed',
        'area[href]',
        'summary',
        '[role="button"]:not([disabled])',
        '[role="link"]',
        '[role="menuitem"]',
        '[role="option"]',
        '[role="radio"]',
        '[role="checkbox"]',
        '[role="tab"]',
        '[role="switch"]',
        '[role="slider"]',
        '[role="spinbutton"]',
        '[role="textbox"]',
      ].join(', ')

      return Array.from(container.querySelectorAll(focusableSelectors)).filter(
        (element) => {
          const el = element as HTMLElement
          return (
            el.offsetWidth > 0 &&
            el.offsetHeight > 0 &&
            !el.hasAttribute('disabled') &&
            !el.getAttribute('aria-hidden') &&
            window.getComputedStyle(el).visibility !== 'hidden' &&
            window.getComputedStyle(el).display !== 'none'
          )
        }
      ) as HTMLElement[]
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        // Shift + Tab: move to previous element
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab: move to next element
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target as HTMLElement
      if (!container.contains(target)) {
        // Focus moved outside the trap, bring it back
        const focusableElements = getFocusableElements()
        if (focusableElements.length > 0) {
          focusableElements[0].focus()
        }
      }
    }

    // Focus the first focusable element when the trap becomes active
    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', handleFocusIn)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', handleFocusIn)

      // Restore focus to the previously focused element
      if (restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }
  }, [active, restoreFocus])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}