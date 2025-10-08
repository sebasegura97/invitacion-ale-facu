"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TextDraw from "@/components/TextDraw";
import Button from "@/components/ui/Button";
import SpriteReveal from "../SpriteReveal";

interface InitialStepProps {
  onCodeSubmit: (code: string) => Promise<void>;
  onStartMusic: () => void;
}

export default function InitialStep({
  onCodeSubmit,
  onStartMusic,
}: InitialStepProps) {
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (code.length !== 6) {
      setError("El código debe tener 6 letras");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onCodeSubmit(code.toUpperCase());
      onStartMusic();
    } catch (error) {
      setError("Código inválido. Por favor verifica tu invitación.");
      setIsSubmitting(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, "");
    if (value.length <= 6) {
      setCode(value);
      setError("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-lg text-center"
    >
      <div className="mb-8">
        {/* Título principal con efecto de dibujo */}
        <TextDraw delay={0.5} duration={2} size="4xl" className="mb-4">
          Invitación de Boda
        </TextDraw>

        <TextDraw delay={2} duration={1.5} size="xl" className="mb-8">
          Por favor ingresa tu código de invitación
        </TextDraw>

        {/* Campo de código */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.5 }}
          className="mb-4"
        >
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            placeholder="ABCDEF"
            maxLength={6}
            className="w-64 px-6 py-3 text-center text-2xl tracking-widest border-b-2 border-wedding-text/30 bg-transparent text-wedding-text font-cursive transition-all outline-none hover:border-wedding-text/50 focus:border-wedding-text active:border-wedding-text placeholder:text-wedding-text/20"
            style={{
              fontFamily:
                "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
            }}
          />
        </motion.div>

        {/* Mensaje de error */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm mb-4"
          >
            {error}
          </motion.p>
        )}
      </div>

      <SpriteReveal />

      {/* Botón de navegación con efecto de dibujo */}
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleSubmit}
          size="md"
          disabled={isSubmitting || code.length !== 6}
        >
          <TextDraw delay={4} duration={1.5} size="lg">
            {isSubmitting ? "Verificando..." : "Continuar"}
          </TextDraw>
        </Button>
      </div>
    </motion.div>
  );
}
