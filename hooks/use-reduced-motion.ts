"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect user's reduced motion preference
 * Respects the prefers-reduced-motion media query
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

/**
 * Hook to get animation duration based on reduced motion preference
 */
export const useAnimationDuration = (normalDuration: number = 0.5) => {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? 0.01 : normalDuration;
};

/**
 * Hook to get animation variants that respect reduced motion
 */
export const useMotionVariants = () => {
  const prefersReducedMotion = useReducedMotion();

  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const scaleIn = {
    hidden: {
      opacity: 0,
      scale: prefersReducedMotion ? 1 : 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  const slideInLeft = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : -30,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const slideInRight = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : 30,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return {
    fadeInUp,
    scaleIn,
    slideInLeft,
    slideInRight,
    prefersReducedMotion,
  };
};