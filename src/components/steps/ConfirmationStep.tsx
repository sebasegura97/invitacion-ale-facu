"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import TextDraw from "@/components/TextDraw";
import AnimatedIcon from "@/components/AnimatedIcon";
import ConfirmationForm from "@/components/ConfirmationForm";

interface ConfirmationStepProps {
  onConfirm: (data: {
    name: string;
    guestCount: number;
    message?: string;
    giftMessage?: string;
  }) => Promise<void>;
}

export default function ConfirmationStep({ onConfirm }: ConfirmationStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-2 text-center"
    >
      <div className="flex items-center justify-center mb-6">
        <AnimatedIcon Icon={Calendar} delay={0.5} />
        <TextDraw
          delay={0.5}
          duration={1.5}
          size="md"
          className="text-gray-400"
        >
          {`expira el  ${WEDDING_CONFIG.confirmationDateLimit}`}
        </TextDraw>
      </div>

      <TextDraw delay={2} duration={1.5} size="4xl" className="mb-8">
        Confirma tu Asistencia
      </TextDraw>

      <ConfirmationForm onConfirm={onConfirm} />
    </motion.div>
  );
}
