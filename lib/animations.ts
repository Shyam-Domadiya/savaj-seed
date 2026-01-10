/**
 * Professional Animation Configuration
 * Centralized animation settings for consistent motion design
 */

// Animation Durations (in seconds)
export const DURATIONS = {
  instant: 0,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.75,
  slowest: 1.0,
} as const;

// Professional Easing Functions
export const EASINGS = {
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  smooth: [0.25, 0.46, 0.45, 0.94],
  professional: [0.34, 1.56, 0.64, 1],
} as const;

// Common Animation Variants
export const VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  scaleOut: {
    hidden: { opacity: 1, scale: 1 },
    visible: { opacity: 0, scale: 0.9 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -180, scale: 0.8 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
  flipInX: {
    hidden: { opacity: 0, rotateX: -90 },
    visible: { opacity: 1, rotateX: 0 },
  },
  flipInY: {
    hidden: { opacity: 0, rotateY: -90 },
    visible: { opacity: 1, rotateY: 0 },
  },
  elasticIn: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  },
  bounceIn: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 15,
      },
    },
  },
} as const;

// Stagger Container Variants
export const STAGGER_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: DURATIONS.slow,
        ease: EASINGS.smooth,
      },
    },
  },
} as const;

// Page Transition Variants
export const PAGE_VARIANTS = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02,
  },
} as const;

// Hover Animation Presets
export const HOVER_ANIMATIONS = {
  lift: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.professional,
    },
  },
  scale: {
    scale: 1.05,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
  scaleSmall: {
    scale: 1.02,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeOut,
    },
  },
  rotate: {
    rotate: 5,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
  float: {
    y: -10,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
  tilt: {
    rotateX: 10,
    rotateY: 10,
    transition: {
      duration: DURATIONS.normal,
      ease: EASINGS.easeOut,
    },
  },
} as const;

// Tap Animation Presets
export const TAP_ANIMATIONS = {
  scale: {
    scale: 0.95,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeInOut,
    },
  },
  scaleSmall: {
    scale: 0.98,
    transition: {
      duration: DURATIONS.fast,
      ease: EASINGS.easeInOut,
    },
  },
} as const;

// Loading Animation Variants
export const LOADING_VARIANTS = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: EASINGS.easeInOut,
    },
  },
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: EASINGS.linear,
    },
  },
  bounce: {
    y: [0, -20, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: EASINGS.easeInOut,
    },
  },
  shimmer: {
    x: [-100, 100],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: EASINGS.linear,
    },
  },
} as const;

// Utility function to create responsive animations
export const createResponsiveVariant = (
  mobileVariant: any,
  desktopVariant: any
) => ({
  mobile: mobileVariant,
  desktop: desktopVariant,
});

// Utility function to respect reduced motion preferences
export const getMotionVariant = (
  variant: any,
  prefersReducedMotion: boolean
) => {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }
  return variant;
};

// Animation presets for common UI elements
export const UI_ANIMATIONS = {
  button: {
    hover: HOVER_ANIMATIONS.scaleSmall,
    tap: TAP_ANIMATIONS.scaleSmall,
  },
  card: {
    hover: HOVER_ANIMATIONS.lift,
    tap: TAP_ANIMATIONS.scale,
  },
  modal: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
  },
  drawer: {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
  },
  dropdown: {
    initial: { opacity: 0, scale: 0.95, y: -10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10 },
  },
  tooltip: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
} as const;