"use client";

import { motion } from "framer-motion";

export type TextSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

interface SizeConfig {
  class: string;
  minHeight: string;
  lineHeight: string;
  letterSpacing: string;
}

interface TextDrawProps {
  children: string;
  delay?: number;
  duration?: number;
  className?: string;
  size?: TextSize;
  responsive?: boolean;
}

export default function TextDraw({
  children,
  delay = 0,
  duration = 4,
  className = "",
  size = "4xl",
  responsive = false,
}: TextDrawProps) {
  const sizeConfig: SizeConfig = {
    xs: {
      class: "text-xs",
      minHeight: "15px",
      lineHeight: "1.2",
      letterSpacing: "0.025em",
    },
    sm: {
      class: "text-sm",
      minHeight: "19px",
      lineHeight: "1.3",
      letterSpacing: "0.025em",
    },
    md: {
      class: "text-base",
      minHeight: "23px",
      lineHeight: "1.4",
      letterSpacing: "0.025em",
    },
    lg: {
      class: "text-lg",
      minHeight: "26px",
      lineHeight: "1.4",
      letterSpacing: "0.025em",
    },
    xl: {
      class: "text-xl",
      minHeight: "31px",
      lineHeight: "1.4",
      letterSpacing: "0.025em",
    },
    "2xl": {
      class: "text-2xl",
      minHeight: "34px",
      lineHeight: "1.3",
      letterSpacing: "0.025em",
    },
    "3xl": {
      class: "text-3xl",
      minHeight: "38px",
      lineHeight: "1.2",
      letterSpacing: "0.025em",
    },
    "4xl": {
      class: "text-4xl",
      minHeight: "41px",
      lineHeight: "1.1",
      letterSpacing: "0.025em",
    },
    "5xl": {
      class: "text-5xl",
      minHeight: "45px",
      lineHeight: "1.1",
      letterSpacing: "0.025em",
    },
    "6xl": {
      class: "text-6xl",
      minHeight: "53px",
      lineHeight: "1.0",
      letterSpacing: "0.025em",
    },
    "7xl": {
      class: "text-7xl",
      minHeight: "60px",
      lineHeight: "1.0",
      letterSpacing: "0.025em",
    },
    "8xl": {
      class: "text-8xl",
      minHeight: "68px",
      lineHeight: "0.9",
      letterSpacing: "0.025em",
    },
    "9xl": {
      class: "text-9xl",
      minHeight: "76px",
      lineHeight: "0.9",
      letterSpacing: "0.025em",
    },
  }[size];

  return (
    <div className={`relative ${className}`}>
      {/* Texto original para accesibilidad */}
      <div className="sr-only">{children}</div>

      {/* Contenedor con efecto de dibujo */}
      <motion.div
        className={`${sizeConfig.class} font-bold text-wedding-text font-cursive relative`}
        style={{
          fontFamily:
            "var(--font-dancing-script), 'Dancing Script', 'Brush Script MT', cursive",
          minHeight: sizeConfig.minHeight,
          lineHeight: sizeConfig.lineHeight,
          letterSpacing: sizeConfig.letterSpacing,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Texto base (invisible) para mantener el espacio */}
        <div className="opacity-0 text-center w-full">{children}</div>

        {/* Texto que se va revelando con efecto de escritura */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-center"
          style={{
            clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
          }}
          animate={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          }}
          transition={{
            duration,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94], // Easing personalizado para efecto más natural
          }}
        >
          {children}
        </motion.div>

        {/* Efecto de brillo sutil al final */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 pointer-events-none"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 0.6,
            delay: delay + duration * 0.9,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}
