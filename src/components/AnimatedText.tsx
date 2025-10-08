"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface AnimatedTextProps {
  phrases: string[];
  duration?: number;
  className?: string;
  delay?: number;
}

export default function AnimatedText({
  phrases,
  duration = 2500,
  className = "",
  delay = 0,
}: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Reset when phrases change
  useEffect(() => {
    setCurrentIndex(0);
    setIsVisible(false);
  }, [phrases]);

  // Handle initial delay and phrase transitions
  useEffect(() => {
    if (phrases.length === 0) return;

    // Initial delay to show first phrase
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    // Timer for subsequent phrases (only if there are multiple phrases)
    if (phrases.length > 1) {
      const transitionTimer = setTimeout(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          // Stop at the last phrase (no loop)
          return nextIndex < phrases.length ? nextIndex : prev;
        });
      }, delay + duration);

      return () => {
        clearTimeout(initialTimer);
        clearTimeout(transitionTimer);
      };
    }

    return () => clearTimeout(initialTimer);
  }, [phrases, duration, delay]);

  if (phrases.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
            }}
            style={{
              fontFamily:
                "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
            }}
            className="inline-block "
          >
            {phrases[currentIndex]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
