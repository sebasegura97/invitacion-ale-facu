"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
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
      className="bg-white p-8 rounded-lg shadow-lg"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-8 h-8 text-wedding-text mr-3" />
          <h2 className="text-3xl font-semibold text-wedding-text">
            Confirma tu Asistencia
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-700"
        >
          <p className="mb-4">
            ¡Esperamos verte en nuestro día especial! Por favor confirma tu
            asistencia para que podamos organizar todo perfectamente.
          </p>
          <p className="text-sm text-gray-600">
            Tu confirmación nos ayuda a planificar la celebración de la mejor
            manera.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <ConfirmationForm onConfirm={onConfirm} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 bg-green-50 p-4 rounded-lg"
      >
        <h3 className="font-semibold text-wedding-text mb-2 text-center">
          📅 Fecha límite de confirmación
        </h3>
        <p className="text-sm text-gray-700 text-center">
          Por favor confirma tu asistencia antes del <strong>1 de junio</strong>{" "}
          para que podamos hacer los arreglos finales.
        </p>
      </motion.div>
    </motion.div>
  );
}
