"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TextDraw from "@/components/TextDraw";
import Button from "@/components/ui/Button";
import { useTranslation } from "@/i18n/context";

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
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    guestCount: 1,
    message: "",
    declined: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para descargar la invitación
  const downloadInvitation = () => {
    const link = document.createElement("a");
    link.href = "/invitacion.jpg";
    link.download = "invitacion.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Función genérica para enviar confirmación
  const submitForm = async (data: {
    confirmed: number;
    message?: string;
    declined?: boolean;
  }) => {
    setIsSubmitting(true);
    try {
      await onConfirm(data);
    } catch (error) {
      console.error("Error confirming:", error);
      alert(t("errors.confirmationFailed"));
      throw error; // Re-throw para que el caller pueda manejar si es necesario
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler para cuando el usuario confirma asistencia
  const handleConfirmAttendance = async () => {
    await submitForm({
      confirmed: formData.guestCount,
      message: formData.message,
      declined: false,
    });
    // Descargar la invitación automáticamente después de confirmar
    downloadInvitation();
  };

  // Handler para cuando el usuario declina
  const handleDeclineAttendance = async () => {
    await submitForm({
      confirmed: 0,
      declined: true,
      message: formData.message,
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
    message: maxGuests > 1 ? 4.5 : 3.5,
    primaryButton: maxGuests > 1 ? 6 : 5,
    secondaryButton: maxGuests > 1 ? 6.5 : 5.5,
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
            {t("confirmation.guestsConfirmed")}
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
            {t("confirmation.of")} {maxGuests}
          </motion.span>
        </div>
      )}

      {/* Campo de mensaje para los novios */}
      <div className="flex flex-col items-center justify-center gap-4 mt-8">
        <TextDraw delay={animationDelays.message} duration={1} size="lg">
          {t("confirmation.messageLabel")}
        </TextDraw>
        <motion.textarea
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: animationDelays.message + 1 }}
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={2}
          className="w-full max-w-md px-4 py-3 border-b-2 border-wedding-text/30 bg-transparent text-wedding-text font-cursive resize-none transition-all outline-none hover:border-wedding-text/50 focus:border-wedding-text active:border-wedding-text placeholder:text-wedding-text/30 text-center"
          style={{
            fontFamily:
              "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
            fontSize: "1.125rem",
          }}
          placeholder={t("confirmation.messagePlaceholder")}
        />
      </div>

      {/* Botones */}
      <div className="flex gap-4 justify-center flex-col mt-12">
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
            {t("confirmation.confirmButton")}
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
            {t("confirmation.declineButton")}
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
            {t("confirmation.viewInvitation")}
          </TextDraw>
        </Button>
      </div>
    </>
  );
}
