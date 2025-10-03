"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { WeddingConfig } from "@/lib/wedding-config";

interface DateTimeStepProps {
  config: WeddingConfig;
}

export default function DateTimeStep({ config }: DateTimeStepProps) {
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
          <Calendar className="w-8 h-8 text-wedding-text mr-3" />
          <h2 className="text-3xl font-semibold text-wedding-text">
            Fecha y Hora
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="text-2xl font-bold text-wedding-text">
            {formatDate(config.date)}
          </div>
          <div className="flex items-center justify-center">
            <Clock className="w-6 h-6 text-gray-600 mr-2" />
            <span className="text-xl text-gray-700">{config.time}</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <button
          onClick={addToCalendar}
          className="inline-flex items-center px-6 py-3 bg-wedding-text text-wedding-bg rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Agregar a Google Calendar
        </button>
      </motion.div>
    </motion.div>
  );
}
