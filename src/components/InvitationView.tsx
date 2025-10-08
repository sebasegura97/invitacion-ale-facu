"use client";

import {
  Calendar,
  Clock,
  MapPin,
  Shirt,
  Map,
  CalendarPlus,
  ArrowLeft,
} from "lucide-react";
import { WEDDING_CONFIG } from "@/lib/wedding-config";
import Button from "./ui/Button";

interface InvitationViewProps {
  invitation: {
    name: string;
    quantity: number;
  };
  onBack: () => void;
}

export default function InvitationView({
  invitation,
  onBack,
}: InvitationViewProps) {
  const handleGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${WEDDING_CONFIG.coordinates.lat},${WEDDING_CONFIG.coordinates.lng}`;
    window.open(url, "_blank");
  };

  const handleGoogleCalendar = () => {
    const dateStr = "20251220T173000/20251221T030000";
    const title = encodeURIComponent("Boda de Alejandra y Facundo");
    const location = encodeURIComponent(WEDDING_CONFIG.address);
    const details = encodeURIComponent(
      `Celebración de la boda en ${WEDDING_CONFIG.location}`
    );

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}&location=${location}&details=${details}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-8 rounded-lg shadow-lg flex flex-col gap-6 relative">
      <button
        onClick={onBack}
        className="absolute top-4 left-4 p-2 hover:bg-wedding-text/10 rounded-full transition-colors"
        aria-label="Volver"
      >
        <ArrowLeft className="w-6 h-6 text-wedding-text" />
      </button>

      <div className="text-center space-y-2">
        <h2
          className="text-4xl font-bold text-wedding-text font-cursive"
          style={{
            fontFamily:
              "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
          }}
        >
          {invitation.name}
        </h2>
        <h1
          className="text-xl font-bold text-wedding-text font-cursive"
          style={{
            fontFamily:
              "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
          }}
        >
          te invitamos a nuestra boda
        </h1>
        {invitation.quantity > 0 && (
          <p
            className="text-lg text-wedding-text/80 font-cursive"
            style={{
              fontFamily:
                "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
            }}
          >
            a vos y {invitation.quantity}{" "}
            {invitation.quantity === 1 ? "acompañante" : "acompañantes"}
          </p>
        )}
      </div>

      <div className="space-y-4 px-4 flex flex-col items-center">
        <div className="flex flex-col justify-center space-y-3 w-full max-w-md">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-wedding-text" />
            <span
              className="text-xl text-wedding-text font-cursive"
              style={{
                fontFamily:
                  "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
              }}
            >
              {WEDDING_CONFIG.date}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-wedding-text" />
            <span
              className="text-xl text-wedding-text font-cursive"
              style={{
                fontFamily:
                  "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
              }}
            >
              {WEDDING_CONFIG.time}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Shirt className="w-5 h-5 text-wedding-text" />
            <span
              className="text-xl text-wedding-text font-cursive"
              style={{
                fontFamily:
                  "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
              }}
            >
              {WEDDING_CONFIG.dressCode}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-wedding-text" />
            <span
              className="text-xl text-wedding-text font-cursive"
              style={{
                fontFamily:
                  "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
              }}
            >
              {WEDDING_CONFIG.location}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6">
        <Button
          onClick={handleGoogleMaps}
          size="md"
          variant="secondary"
          className="flex justify-center items-center h-12"
          icon={Map}
        >
          <span
            className="text-lg font-cursive"
            style={{
              fontFamily:
                "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
            }}
          >
            Ver en Google Maps
          </span>
        </Button>

        <Button
          onClick={handleGoogleCalendar}
          size="md"
          variant="primary"
          className="flex justify-center items-center h-12"
          icon={CalendarPlus}
        >
          <span
            className="text-lg font-cursive"
            style={{
              fontFamily:
                "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
            }}
          >
            Agregar a Google Calendar
          </span>
        </Button>
      </div>
    </div>
  );
}
