"use client";

import { motion } from "framer-motion";
import TextDraw from "@/components/TextDraw";
import Button from "@/components/ui/Button";

interface InitialStepProps {
  onNext: () => void;
  onStartMusic: () => void;
  name: string;
}

export default function InitialStep({
  onNext,
  onStartMusic,
  name,
}: InitialStepProps) {
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

        <TextDraw delay={2} duration={1.5} size="4xl" className="mb-8">
          {name}
        </TextDraw>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={() => {
            onStartMusic();
            onNext();
          }}
          size="md"
          disabled={false}
        >
          <TextDraw delay={4} duration={1.5} size="lg">
            Continuar
          </TextDraw>
        </Button>
      </div>
    </motion.div>
  );
}
