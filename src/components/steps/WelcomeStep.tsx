"use client";

import { motion } from "framer-motion";
import TextDraw from "@/components/TextDraw";
import HeartDraw from "@/components/HeartDraw";
import Button from "@/components/ui/Button";

interface WelcomeStepProps {
  onNext: () => void;
  userName?: string;
}

export default function WelcomeStep({ onNext, userName }: WelcomeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-lg text-center"
    >
      <div className="mb-8">
        {/* Nombre del invitado si existe */}
        {userName && (
          <TextDraw delay={0.5} duration={1.5} size="3xl" className="mb-4">
            {userName}
          </TextDraw>
        )}

        {/* Subtítulo con efecto de dibujo */}
        <TextDraw
          delay={userName ? 2 : 0.5}
          duration={2}
          size="2xl"
          className="mb-2"
        >
          ¡Nos casamos!
        </TextDraw>

        {/* Título principal con efecto de dibujo */}
        <TextDraw
          delay={userName ? 3.5 : 2}
          duration={2}
          size="6xl"
          className="mb-4"
        >
          Ale y Facu
        </TextDraw>

        <div className="flex justify-center">
          <HeartDraw delay={userName ? 5 : 3} />
        </div>
      </div>

      <TextDraw delay={userName ? 6.5 : 5} duration={2} size="xl">
        ¡Y queremos que formes parte de este día tan especial!
      </TextDraw>

      {/* Botón de navegación con efecto de dibujo */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={onNext}
          autoProgress={true}
          autoProgressDelay={userName ? 7500 : 6000}
          autoProgressDuration={6000}
          onAutoComplete={onNext}
          variant="primary"
          size="md"
        >
          <TextDraw
            delay={userName ? 8.5 : 7}
            duration={1.5}
            size="lg"
            className=""
          >
            Continuar
          </TextDraw>
        </Button>
      </div>
    </motion.div>
  );
}
