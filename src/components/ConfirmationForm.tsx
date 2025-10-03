"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
    name: "",
    guestCount: 1,
    message: "",
    giftMessage: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onConfirm(formData);
      setIsConfirmed(true);
    } catch (error) {
      console.error("Error confirming:", error);
      alert("Hubo un error al confirmar. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guestCount" ? parseInt(value) : value,
    }));
  };

  if (isConfirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-green-50 rounded-lg border border-green-200"
      >
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-semibold text-green-800 mb-2">
          ¡Confirmación exitosa!
        </h3>
        <p className="text-green-700">
          Gracias por confirmar tu asistencia. ¡Esperamos verte en nuestra boda!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-2xl font-semibold text-wedding-text mb-6 text-center">
        Confirma tu asistencia
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-wedding-text mb-2"
          >
            Nombre completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-text focus:border-transparent"
            placeholder="Ej: Familia González"
          />
        </div>

        <div>
          <label
            htmlFor="guestCount"
            className="block text-sm font-medium text-wedding-text mb-2"
          >
            Número de invitados *
          </label>
          <select
            id="guestCount"
            name="guestCount"
            value={formData.guestCount}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-text focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "persona" : "personas"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-wedding-text mb-2"
          >
            Mensaje para los novios (opcional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-text focus:border-transparent"
            placeholder="¡Estamos muy emocionados por su boda!"
          />
        </div>

        <div>
          <label
            htmlFor="giftMessage"
            className="block text-sm font-medium text-wedding-text mb-2"
          >
            Mensaje para el regalo (opcional)
          </label>
          <textarea
            id="giftMessage"
            name="giftMessage"
            value={formData.giftMessage}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-text focus:border-transparent"
            placeholder="¡Que tengan una vida llena de amor y felicidad!"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-wedding-text text-wedding-bg py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Confirmando..." : "Confirmar asistencia"}
        </button>
      </form>
    </motion.div>
  );
}
