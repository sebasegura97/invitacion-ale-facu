// HeartDraw.tsx
import * as React from "react";
import { motion } from "framer-motion";

type Props = {
  size?: number; // tamaño del SVG en px
  stroke?: string; // color del trazo
  strokeWidth?: number; // grosor del trazo
  duration?: number; // duración del dibujo (s)
  loop?: boolean; // si se repite ida y vuelta
};

export default function HeartDraw({
  size = 240,
  stroke = "#E11D48", // tailwind rose-600
  strokeWidth = 8,
  duration = 2.0,
  loop = true,
}: Props) {
  const [currentPath, setCurrentPath] = React.useState(0);
  // Path del corazón usando las coordenadas exactas del SVG heart.svg
  const leftpath =
    "M290 209C301.5 54.0002 152.004 -51.8022 54.5001 63.0003C-69.5 209 127.5 424 235.5 512.5";
  const rightpath =
    "M264 704C311.5 432 498 506.5 586 315.5C642 116 366 14 290 209";

  return (
    <div style={{ display: "inline-block" }}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 608 718"
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => {
          if (currentPath === 0) {
            setCurrentPath(1);
          } else if (loop) {
            setCurrentPath(0);
          }
        }}
      >
        {/* Primer trazo - comienza desde el borde inferior */}
        <motion.path
          d={leftpath}
          fill="transparent"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0 },
            visible: { pathLength: currentPath >= 0 ? 1 : 0 },
          }}
          transition={{
            duration: duration / 2,
            ease: "easeInOut",
            delay: 0,
          }}
        />

        {/* Segundo trazo - comienza desde el borde superior */}
        <motion.path
          d={rightpath}
          fill="transparent"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0 },
            visible: { pathLength: currentPath >= 1 ? 1 : 0 },
          }}
          transition={{
            duration: duration / 2,
            ease: "easeInOut",
            delay: currentPath >= 1 ? 0 : duration / 2,
          }}
        />
      </motion.svg>
    </div>
  );
}
