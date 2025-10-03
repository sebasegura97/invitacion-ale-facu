"use client";

import { motion } from "framer-motion";
import TextDraw from "@/components/TextDraw";
import HeartDraw from "@/components/HeartDraw";

export default function WelcomeStep() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-lg shadow-lg text-center"
    >
      <div className="mb-8">
        {/* Título principal con efecto de dibujo */}
        <TextDraw delay={0.5} duration={2.5} size="5xl" className="mb-4 ">
          Alejandra & Facundo
        </TextDraw>

        {/* Subtítulo con efecto de dibujo */}
        <TextDraw
          delay={1.5}
          duration={1.5}
          size="xl"
          className="text-gray-600 mb-2"
        >
          Se casan
        </TextDraw>

        <div className="flex justify-center">
          <HeartDraw />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="space-y-4 text-gray-700"
      >
        <p className="text-lg">
          ¡Estamos muy emocionados de compartir este día tan especial con
          ustedes!
        </p>
        <p className="text-base">
          Los invitamos a ser parte de nuestra celebración y crear juntos
          recuerdos inolvidables.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.8 }}
        className="mt-8"
      >
        <div className="bg-wedding-text text-wedding-bg px-6 py-3 rounded-lg inline-block">
          <p className="font-semibold">¡Gracias por estar aquí!</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
