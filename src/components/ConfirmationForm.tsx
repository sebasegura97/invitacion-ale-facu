"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextDraw from "@/components/TextDraw";
import Button from "@/components/ui/Button";

interface ConfirmationFormProps {
  onConfirm: (data: {
    name: string;
    guestCount: number;
    message?: string;
    giftMessage?: string;
  }) => Promise<void>;
}

export default function ConfirmationForm({ onConfirm }: ConfirmationFormProps) {
  const [formData, setFormData] = useState({
    guestCount: 1,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleSubmit = async (willAttend: boolean) => {
    if (willAttend) {
      // Si confirma asistencia, mostrar modal para mensaje
      setShowMessageModal(true);
      return;
    }

    // Si no asiste, confirmar directamente
    setIsSubmitting(true);

    try {
      await onConfirm({
        name: "Invitado",
        guestCount: 0,
        message: formData.message,
      });
      setIsConfirmed(true);
    } catch (error) {
      console.error("Error confirming:", error);
      alert("Hubo un error al confirmar. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmWithMessage = async () => {
    setIsSubmitting(true);

    try {
      await onConfirm({
        name: "Invitado",
        guestCount: formData.guestCount,
        message: formData.message,
      });
      setIsConfirmed(true);
      setShowMessageModal(false);
    } catch (error) {
      console.error("Error confirming:", error);
      alert("Hubo un error al confirmar. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guestCount" ? parseInt(value) || 1 : value,
    }));
  };

  if (isConfirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-2 text-center"
      >
        <TextDraw
          delay={0.5}
          duration={2}
          size="4xl"
          className="mb-8 text-green-600"
        >
          ¡Confirmación exitosa!
        </TextDraw>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5 }}
          className="text-center"
        >
          <div className="text-4xl mb-4">✓</div>
          <TextDraw delay={3} duration={1.5} size="lg">
            Gracias por confirmar. ¡Esperamos verte en nuestra boda!
          </TextDraw>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      {/* Campo de invitados confirmados */}
      <div className="flex items-center justify-center gap-4">
        <TextDraw delay={3} duration={1} size="xl">
          Invitados confirmados
        </TextDraw>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          <input
            type="number"
            id="guestCount"
            name="guestCount"
            min="1"
            max="10"
            value={formData.guestCount}
            onChange={handleChange}
            className="w-12 px-2 py-2 border-b-2 border-wedding-text/30 bg-transparent text-wedding-text text-center font-cursive transition-all outline-none hover:border-wedding-text/50 focus:border-wedding-text active:border-wedding-text"
            style={{
              fontFamily:
                "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
              fontSize: "1.25rem",
            }}
          />
        </motion.div>
      </div>

      {/* Botones */}
      <div className="flex gap-4 justify-center flex-col sm:flex-row mt-12">
        <Button
          onClick={() => handleSubmit(true)}
          disabled={isSubmitting}
          variant="secondary"
          size="md"
          className="flex-1"
          backgroundAnimationDelay={5.5}
        >
          <TextDraw delay={5} duration={1} size="lg">
            Confirmar asistencia
          </TextDraw>
        </Button>

        <Button
          onClick={() => handleSubmit(false)}
          disabled={isSubmitting}
          variant="primary"
          size="md"
          className="flex-1"
        >
          <TextDraw delay={6} duration={0.5} size="lg">
            No podré asistir
          </TextDraw>
        </Button>
      </div>

      {/* Modal para mensaje */}
      <AnimatePresence>
        {showMessageModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMessageModal(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-wedding-background/95 backdrop-blur-md rounded-lg max-w-md w-full p-8 space-y-6">
                <div className="text-center">
                  <TextDraw
                    delay={0.5}
                    duration={1}
                    size="3xl"
                    className="mb-2"
                  >
                    Mensaje para los novios
                  </TextDraw>
                </div>

                <motion.textarea
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 }}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border-b-2 border-wedding-text/30 bg-transparent text-wedding-text font-cursive resize-none transition-all outline-none hover:border-wedding-text/50 focus:border-wedding-text active:border-wedding-text placeholder:text-wedding-text/30"
                  style={{
                    fontFamily:
                      "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
                    fontSize: "1.125rem",
                  }}
                  placeholder="Escribe un mensaje para los novios..."
                  autoFocus
                />

                <Button
                  onClick={handleConfirmWithMessage}
                  disabled={isSubmitting}
                  size="md"
                  className="flex-1 m-auto      "
                >
                  <TextDraw delay={2.5} duration={1} size="lg">
                    {isSubmitting ? "Confirmando..." : "Continuar"}
                  </TextDraw>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
