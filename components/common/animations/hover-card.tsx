"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
  tapScale?: number;
}

const HoverCard = ({ 
  children, 
  className = "",
  hoverScale = 1.02,
  hoverY = -8,
  tapScale = 0.98
}: HoverCardProps) => {
  return (
    <motion.div
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        transition: {
          duration: 0.3,
          ease: [0.34, 1.56, 0.64, 1],
        },
      }}
      whileTap={{
        scale: tapScale,
        transition: {
          duration: 0.1,
          ease: [0.4, 0, 0.2, 1],
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default HoverCard;