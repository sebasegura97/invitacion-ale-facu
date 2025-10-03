"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { WeddingConfig } from "@/lib/wedding-config";

interface LocationStepProps {
  config: WeddingConfig;
}

export default function LocationStep({ config }: LocationStepProps) {
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
          <MapPin className="w-8 h-8 text-wedding-text mr-3" />
          <h2 className="text-3xl font-semibold text-wedding-text">
            Ubicación
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="text-2xl font-bold text-wedding-text">
            {config.location}
          </div>
          <div className="text-lg text-gray-600">{config.address}</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-wedding-text mb-2">Cómo llegar</h3>
          <p className="text-sm text-gray-600 mb-4">
            Haz clic en el botón para abrir Google Maps con las direcciones
          </p>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${config.coordinates.lat},${config.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-wedding-text text-wedding-bg rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Abrir en Google Maps
          </a>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-wedding-text mb-2">
            Estacionamiento
          </h3>
          <p className="text-sm text-gray-600">
            Habrá estacionamiento disponible en el lugar para todos los
            invitados.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
