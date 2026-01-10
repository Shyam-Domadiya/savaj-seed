"use client"

import { useEffect, useCallback } from "react"

interface KeyboardNavigationOptions {
  onEscape?: () => void
  onEnter?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onTab?: (event: KeyboardEvent) => void
  onHome?: () => void
  onEnd?: () => void
  onPageUp?: () => void
  onPageDown?: () => void
  enabled?: boolean
  preventDefault?: boolean
  stopPropagation?: boolean
}

export function useKeyboardNavigation({
  onEscape,
  onEnter,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onTab,
  onHome,
  onEnd,
  onPageUp,
  onPageDown,
  enabled = true,
  preventDefault = true,
  stopPropagation = false,
}: KeyboardNavigationOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      const { key, code } = event

      let handled = false

      switch (key) {
        case 'Escape':
          if (onEscape) {
            onEscape()
            handled = true
          }
          break
        case 'Enter':
          if (onEnter) {
            onEnter()
            handled = true
          }
          break
        case 'ArrowUp':
          if (onArrowUp) {
            onArrowUp()
            handled = true
          }
          break
        case 'ArrowDown':
          if (onArrowDown) {
            onArrowDown()
            handled = true
          }
          break
        case 'ArrowLeft':
          if (onArrowLeft) {
            onArrowLeft()
            handled = true
          }
          break
        case 'ArrowRight':
          if (onArrowRight) {
            onArrowRight()
            handled = true
          }
          break
        case 'Tab':
          if (onTab) {
            onTab(event)
            handled = true
          }
          break
        case 'Home':
          if (onHome) {
            onHome()
            handled = true
          }
          break
        case 'End':
          if (onEnd) {
            onEnd()
            handled = true
          }
          break
        case 'PageUp':
          if (onPageUp) {
            onPageUp()
            handled = true
          }
          break
        case 'PageDown':
          if (onPageDown) {
            onPageDown()
            handled = true
          }
          break
      }

      if (handled) {
        if (preventDefault) {
          event.preventDefault()
        }
        if (stopPropagation) {
          event.stopPropagation()
        }
      }
    },
    [
      enabled,
      onEscape,
      onEnter,
      onArrowUp,
      onArrowDown,
      onArrowLeft,
      onArrowRight,
      onTab,
      onHome,
      onEnd,
      onPageUp,
      onPageDown,
      preventDefault,
      stopPropagation,
    ]
  )

  useEffect(() => {
    if (!enabled) return

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown, enabled])

  return { handleKeyDown }
}

// Utility function to get all focusable elements within a container
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
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

// Utility function to manage focus within a container
export function manageFocus(
  container: HTMLElement,
  direction: 'next' | 'previous' | 'first' | 'last'
): boolean {
  const focusableElements = getFocusableElements(container)
  if (focusableElements.length === 0) return false

  const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)

  let targetIndex: number

  switch (direction) {
    case 'next':
      targetIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0
      break
    case 'previous':
      targetIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1
      break
    case 'first':
      targetIndex = 0
      break
    case 'last':
      targetIndex = focusableElements.length - 1
      break
    default:
      return false
  }

  focusableElements[targetIndex]?.focus()
  return true
}