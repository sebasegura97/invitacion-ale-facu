"use client";

import { motion } from "framer-motion";
import { Shirt } from "lucide-react";
import { WeddingConfig } from "@/lib/wedding-config";

interface DressCodeStepProps {
  config: WeddingConfig;
}

export default function DressCodeStep({ config }: DressCodeStepProps) {
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
          <Shirt className="w-8 h-8 text-wedding-text mr-3" />
          <h2 className="text-3xl font-semibold text-wedding-text">
            Código de Vestimenta
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-700"
        >
          {config.dressCode}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-6"
      >
        <div className="bg-pink-50 p-6 rounded-lg">
          <h3 className="font-semibold text-wedding-text mb-3 text-center">
            💡 Sugerencias
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Para ellas:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Vestidos elegantes</li>
                <li>• Colores pastel o neutros</li>
                <li>• Zapatos cómodos</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Para ellos:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Traje o camisa elegante</li>
                <li>• Colores neutros</li>
                <li>• Zapatos formales</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 text-center">
            <strong>Nota:</strong> Evita usar blanco, ya que es el color de la
            novia. ¡Gracias por tu comprensión!
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
