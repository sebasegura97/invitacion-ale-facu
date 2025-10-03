"use client";

import { useEffect, useRef } from "react";

interface GoogleMapsProps {
  lat: number;
  lng: number;
  location: string;
  address: string;
}

export default function GoogleMaps({
  lat,
  lng,
  location,
  address,
}: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMapRef = mapRef.current;
    if (!currentMapRef) return;

    // Crear el iframe de Google Maps
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${lat},${lng}&zoom=15`;
    iframe.width = "100%";
    iframe.height = "300";
    iframe.style.border = "0";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";

    currentMapRef.appendChild(iframe);

    return () => {
      if (currentMapRef) {
        currentMapRef.innerHTML = "";
      }
    };
  }, [lat, lng]);

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4 text-wedding-text">
        Ubicación
      </h3>
      <div className="mb-4">
        <p className="text-lg font-medium text-wedding-text">{location}</p>
        <p className="text-sm text-gray-600">{address}</p>
      </div>
      <div
        ref={mapRef}
        className="w-full h-[300px] rounded-lg overflow-hidden shadow-lg"
      />
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center mt-4 px-4 py-2 bg-wedding-text text-wedding-bg rounded-lg hover:bg-opacity-90 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        Cómo llegar
      </a>
    </div>
  );
}
