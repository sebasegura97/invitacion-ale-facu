"use client";

import { useRef, useImperativeHandle, forwardRef, useEffect } from "react";

export interface BackgroundMusicRef {
  play: () => Promise<void>;
  pause: () => void;
}

const BackgroundMusic = forwardRef<BackgroundMusicRef>((props, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Función para animar el volumen gradualmente
  const animateVolume = (
    startVolume: number,
    endVolume: number,
    durationMs: number
  ) => {
    if (!audioRef.current) return;

    const audio = audioRef.current;
    const startTime = Date.now();
    const volumeDiff = endVolume - startVolume;

    // Limpiar cualquier animación previa
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    // Animar el volumen cada 50ms
    fadeIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Interpolación lineal del volumen
      audio.volume = startVolume + volumeDiff * progress;

      // Detener la animación cuando se complete
      if (progress >= 1) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }
    }, 50);
  };

  // Exponer métodos para controlar el audio desde fuera
  useImperativeHandle(ref, () => ({
    play: async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0;

          await audioRef.current.play();

          animateVolume(0, 0.5, 30000);
        } catch (error) {
          console.error("Error al reproducir:", error);
        }
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();

        // Limpiar la animación de volumen si está activa
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }
    },
  }));

  // Limpiar el intervalo al desmontar el componente
  useEffect(() => {
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/song.webm" preload="auto" />
    </>
  );
});

BackgroundMusic.displayName = "BackgroundMusic";

export default BackgroundMusic;
