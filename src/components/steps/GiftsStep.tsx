"use client";

import { motion } from "framer-motion";
import { Gift, Copy, Check } from "lucide-react";
import { useState } from "react";
import { WeddingConfig } from "@/lib/wedding-config";

interface GiftsStepProps {
  config: WeddingConfig;
}

export default function GiftsStep({ config }: GiftsStepProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

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
          <Gift className="w-8 h-8 text-wedding-text mr-3" />
          <h2 className="text-3xl font-semibold text-wedding-text">Regalos</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-700"
        >
          {config.giftInfo.message}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-6"
      >
        {config.giftInfo.accounts.map((account, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-wedding-text mb-2">
                {account.name}
              </h3>
              <p className="text-gray-600">{account.bank}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300">
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono text-wedding-text">
                  {account.account}
                </span>
                <button
                  onClick={() => copyToClipboard(account.account, index)}
                  className="ml-4 p-2 bg-wedding-text text-wedding-bg rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {copiedIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-2"
              >
                <span className="text-sm text-green-600 font-medium">
                  ¡Copiado al portapapeles!
                </span>
              </motion.div>
            )}
          </div>
        ))}

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-wedding-text mb-2 text-center">
            💝 Mensaje de Agradecimiento
          </h3>
          <p className="text-sm text-gray-700 text-center">
            Si deseas incluir un mensaje especial con tu regalo, puedes
            escribirlo en la confirmación de asistencia.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
