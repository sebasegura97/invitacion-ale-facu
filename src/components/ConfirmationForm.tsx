"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextDraw from "@/components/TextDraw";
import Button from "@/components/ui/Button";

interface ConfirmationFormProps {
  onConfirm: (data: {
    confirmed: number;
    message?: string;
    declined?: boolean;
  }) => Promise<void>;
  maxGuests: number;
  onShowInvitation: () => void;
}

export default function ConfirmationForm({
  onConfirm,
  maxGuests,
  onShowInvitation,
}: ConfirmationFormProps) {
  const [formData, setFormData] = useState({
    guestCount: 1,
    message: "",
    declined: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  // Función genérica para enviar confirmación
  const submitForm = async (data: {
    confirmed: number;
    message?: string;
    declined?: boolean;
  }) => {
    setIsSubmitting(true);
    try {
      await onConfirm(data);
      setShowMessageModal(false);
    } catch (error) {
      console.error("Error confirming:", error);
      alert("Hubo un error al confirmar. Por favor intenta de nuevo.");
      throw error; // Re-throw para que el caller pueda manejar si es necesario
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler para cuando el usuario confirma asistencia
  const handleConfirmAttendance = () => {
    setShowMessageModal(true);
  };

  // Handler para cuando el usuario declina
  const handleDeclineAttendance = async () => {
    await submitForm({
      confirmed: 0,
      declined: true,
      message: formData.message,
    });
  };

  // Handler para confirmar desde el modal (con mensaje opcional)
  const handleConfirm = async () => {
    await submitForm({
      confirmed: formData.guestCount,
      message: formData.message,
      declined: false,
    });
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

  const animationDelays = {
    confirmedGuests: 3,
    primaryButton: maxGuests > 1 ? 4.5 : 3.5,
    secondaryButton: maxGuests > 1 ? 5 : 4,
  };

  return (
    <>
      {/* Campo de invitados confirmados */}
      {maxGuests > 1 && (
        <div className="flex items-center justify-center gap-4">
          <TextDraw
            delay={animationDelays.confirmedGuests}
            duration={1}
            size="xl"
          >
            Invitados confirmados
          </TextDraw>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: animationDelays.confirmedGuests + 1 }}
          >
            <input
              type="number"
              id="guestCount"
              name="guestCount"
              min="1"
              max={maxGuests}
              defaultValue={maxGuests}
              onChange={handleChange}
              className="w-12 px-2 py-2 border-b-2 border-wedding-text/30 bg-transparent text-wedding-text text-center font-cursive transition-all outline-none hover:border-wedding-text/50 focus:border-wedding-text active:border-wedding-text"
              style={{
                fontFamily:
                  "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
                fontSize: "1.25rem",
              }}
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: animationDelays.confirmedGuests + 1.5 }}
            className="text-wedding-text/50 font-cursive text-lg"
            style={{
              fontFamily:
                "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
            }}
          >
            de {maxGuests}
          </motion.span>
        </div>
      )}

      {/* Botones */}
      <div className="flex gap-4 justify-center flex-col sm:flex-row mt-12">
        <Button
          onClick={handleConfirmAttendance}
          disabled={isSubmitting}
          variant="secondary"
          size="md"
          className="flex-1"
          backgroundAnimationDelay={animationDelays.primaryButton + 0.5}
        >
          <TextDraw
            delay={animationDelays.primaryButton}
            duration={1}
            size="lg"
          >
            Confirmar asistencia
          </TextDraw>
        </Button>

        <Button
          onClick={handleDeclineAttendance}
          disabled={isSubmitting}
          variant="primary"
          size="md"
          className="flex-1"
        >
          <TextDraw
            delay={animationDelays.secondaryButton}
            duration={0.5}
            size="lg"
          >
            No podré asistir
          </TextDraw>
        </Button>
        <Button
          onClick={onShowInvitation}
          variant="primary"
          size="md"
          className="flex-1"
        >
          <TextDraw
            delay={animationDelays.secondaryButton}
            duration={0.5}
            size="lg"
          >
            Ver invitación
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
              className="fixed inset-0 bg-black/70 z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-wedding-bg rounded-lg max-w-md w-full p-8 space-y-6 shadow-2xl">
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
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  size="md"
                  className="flex-1 m-auto"
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
