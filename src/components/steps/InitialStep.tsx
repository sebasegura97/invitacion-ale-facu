"use client";

import { motion } from "framer-motion";
import TextDraw from "@/components/TextDraw";
import HeartDraw from "@/components/HeartDraw";
import Button from "@/components/ui/Button";

interface InitialStepProps {
  userName: string;
  onNext: () => void;
  onStartMusic: () => void;
}

export default function InitialStep({
  userName,
  onNext,
  onStartMusic,
}: InitialStepProps) {
  const handleContinue = () => {
    onStartMusic();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-lg text-center"
    >
      <div className="mb-8">
        {/* Título principal con efecto de dibujo */}
        <TextDraw delay={0.5} duration={2} size="xl" className="mb-4">
          Invitación para
        </TextDraw>

        {/* Nombre del usuario con efecto de dibujo */}
        <TextDraw delay={2} duration={2} size="4xl" className="mb-4">
          {userName}
        </TextDraw>
      </div>

      {/* Botón de navegación con efecto de dibujo */}
      <div className="mt-8 flex justify-center">
        <Button onClick={handleContinue} size="md">
          <TextDraw delay={4} duration={1.5} size="lg" className="">
            Continuar
          </TextDraw>
        </Button>
      </div>
    </motion.div>
  );
}
