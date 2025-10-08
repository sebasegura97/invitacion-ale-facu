"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedIconProps {
  Icon: LucideIcon;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function AnimatedIcon({
  Icon,
  delay = 0,
  duration = 0.5,
  className = "w-4 h-4 text-wedding-text mr-3",
}: AnimatedIconProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        delay,
        duration,
        type: "spring",
        stiffness: 200,
        damping: 10,
      }}
    >
      <Icon className={className} />
    </motion.div>
  );
}
