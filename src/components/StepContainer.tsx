"use client";

import { motion, AnimatePresence } from "framer-motion";

interface StepContainerProps {
  currentStep: number;
  children: React.ReactNode;
}

export default function StepContainer({
  currentStep,
  children,
}: StepContainerProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
