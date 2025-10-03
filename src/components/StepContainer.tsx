"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StepContainerProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  children: React.ReactNode;
  showNavigation?: boolean;
}

export default function StepContainer({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  children,
  showNavigation = true,
}: StepContainerProps) {
  return (
    <div className="min-h-screen bg-wedding-bg flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-wedding-text mb-2">
              Invitación Digital
            </h1>
            <p className="text-gray-600">Boda de Alejandra & Facundo</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
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

      {/* Navigation */}
      {showNavigation && (
        <div className="bg-white border-t">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <button
                onClick={onPrevious}
                disabled={currentStep === 0}
                className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors ${
                  currentStep === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-wedding-text hover:bg-gray-100"
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Anterior
              </button>

              <div className="flex space-x-2">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i === currentStep
                        ? "bg-wedding-text"
                        : i < currentStep
                        ? "bg-gray-400"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={onNext}
                disabled={currentStep === totalSteps - 1}
                className={`flex items-center px-6 py-2 rounded-lg font-semibold transition-colors ${
                  currentStep === totalSteps - 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "bg-wedding-text text-wedding-bg hover:bg-opacity-90"
                }`}
              >
                {currentStep === totalSteps - 1 ? "Finalizar" : "Continuar"}
                {currentStep < totalSteps - 1 && (
                  <ChevronRight className="w-4 h-4 ml-2" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
