"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScaleInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  scale?: number;
  className?: string;
}

const ScaleIn = ({ 
  children, 
  delay = 0, 
  duration = 0.4,
  scale = 0.9,
  className = ""
}: ScaleInProps) => {
  const variants = {
    hidden: {
      opacity: 0,
      scale,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.34, 1.56, 0.64, 1], // Professional bounce
      }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScaleIn;