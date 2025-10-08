"use client";

import { motion } from "framer-motion";
import TextDraw from "@/components/TextDraw";
import HeartDraw from "@/components/HeartDraw";
import Button from "@/components/ui/Button";

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-lg text-center"
    >
      <div className="mb-8">
        {/* Subtítulo con efecto de dibujo */}
        <TextDraw delay={0.5} duration={2} size="2xl" className="mb-2">
          ¡Nos casamos!
        </TextDraw>

        {/* Título principal con efecto de dibujo */}
        <TextDraw delay={2} duration={2} size="6xl" className="mb-4">
          Ale y Facu
        </TextDraw>

        <div className="flex justify-center">
          <HeartDraw delay={3} />
        </div>
      </div>

      <TextDraw delay={5} duration={2} size="xl">
        ¡Y queremos que formes parte de este día tan especial!
      </TextDraw>

      {/* Botón de navegación con efecto de dibujo */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={onNext}
          autoProgress={true}
          autoProgressDelay={6000}
          autoProgressDuration={6000}
          onAutoComplete={onNext}
          variant="primary"
          size="md"
        >
          <TextDraw delay={7} duration={1.5} size="lg" className="">
            Continuar
          </TextDraw>
        </Button>
      </div>
    </motion.div>
  );
}
