"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Heart, Gift } from "lucide-react";
import { WeddingConfig } from "@/lib/wedding-config";

interface WeddingInfoProps {
  config: WeddingConfig;
}

export default function WeddingInfo({ config }: WeddingInfoProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const addToCalendar = () => {
    const startDate = new Date(`${config.date}T${config.time}`);
    const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4 horas después

    const startDateISO =
      startDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const endDateISO =
      endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda%20de%20Alejandra%20y%20Facundo&dates=${startDateISO}/${endDateISO}&details=¡Te%20invitamos%20a%20nuestra%20boda!&location=${encodeURIComponent(
      config.address
    )}`;

    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-wedding-text mb-4">
          Alejandra & Facundo
        </h1>
        <p className="text-xl text-gray-600 mb-2">Se casan</p>
        <div className="flex justify-center">
          <Heart className="w-6 h-6 text-pink-500" />
        </div>
      </motion.div>

      {/* Date and Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex items-center justify-center mb-4">
          <Calendar className="w-6 h-6 text-wedding-text mr-2" />
          <h2 className="text-2xl font-semibold text-wedding-text">
            Fecha y Hora
          </h2>
        </div>

        <div className="text-center space-y-2">
          <p className="text-xl font-medium text-wedding-text">
            {formatDate(config.date)}
          </p>
          <div className="flex items-center justify-center">
            <Clock className="w-5 h-5 text-gray-600 mr-2" />
            <p className="text-lg text-gray-700">{config.time}</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={addToCalendar}
            className="inline-flex items-center px-6 py-3 bg-wedding-text text-wedding-bg rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Agregar a Google Calendar
          </button>
        </div>
      </motion.div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex items-center mb-4">
          <MapPin className="w-6 h-6 text-wedding-text mr-2" />
          <h2 className="text-2xl font-semibold text-wedding-text">
            Ubicación
          </h2>
        </div>

        <div className="space-y-2">
          <p className="text-lg font-medium text-wedding-text">
            {config.location}
          </p>
          <p className="text-gray-600">{config.address}</p>
        </div>
      </motion.div>

      {/* Dress Code */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-wedding-text mb-4 text-center">
          Código de Vestimenta
        </h2>
        <p className="text-center text-lg text-gray-700">{config.dressCode}</p>
      </motion.div>

      {/* Gift Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="flex items-center justify-center mb-4">
          <Gift className="w-6 h-6 text-wedding-text mr-2" />
          <h2 className="text-2xl font-semibold text-wedding-text">Regalos</h2>
        </div>

        <p className="text-center text-gray-700 mb-6">
          {config.giftInfo.message}
        </p>

        <div className="space-y-4">
          {config.giftInfo.accounts.map((account, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-wedding-text">{account.name}</p>
              <p className="text-gray-600">{account.bank}</p>
              <p className="text-lg font-mono bg-white px-3 py-1 rounded border">
                {account.account}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
