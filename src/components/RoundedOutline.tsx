import * as React from "react";
import { motion, useAnimation } from "framer-motion";

type Props = {
  width?: number; // viewBox base (se adapta al contenedor)
  height?: number;
  radius?: number; // radio de esquina
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  className?: string; // para color via currentColor
  preserveAspectRatio?: "xMidYMid meet" | "none";
};

export default function RoundedOutline({
  width = 400,
  height = 200,
  radius = 16,
  strokeWidth = 2,
  duration = 2,
  delay = 0,
  className,
  preserveAspectRatio = "xMidYMid meet",
}: Props) {
  const pathRef = React.useRef<SVGPathElement | null>(null);
  const controls = useAnimation();

  // margen = stroke/2 para que el trazo no se “corte” con el borde del viewBox
  const pad = strokeWidth / 2;
  const w = Math.max(0, width - pad * 2);
  const h = Math.max(0, height - pad * 2);
  const r = Math.min(radius, w / 2, h / 2);

  const d = [
    `M ${pad + r} ${pad}`,
    `H ${pad + w - r}`,
    `A ${r} ${r} 0 0 1 ${pad + w} ${pad + r}`,
    `V ${pad + h - r}`,
    `A ${r} ${r} 0 0 1 ${pad + w - r} ${pad + h}`,
    `H ${pad + r}`,
    `A ${r} ${r} 0 0 1 ${pad} ${pad + h - r}`,
    `V ${pad + r}`,
    `A ${r} ${r} 0 0 1 ${pad + r} ${pad}`,
  ].join(" ");

  React.useEffect(() => {
    if (!pathRef.current) return;
    const L = pathRef.current.getTotalLength();
    // posición inicial: solo 1px visible
    controls.set({
      strokeDasharray: `1 ${L - 1}`,
      strokeDashoffset: 0,
      opacity: 1,
    });
    // animar: crecer desde 1px hasta el largo total
    controls.start({
      strokeDasharray: `${L} 0`,
      transition: {
        duration,
        delay,
        ease: "easeInOut",
        type: "tween",
      },
    });
  }, [d, controls, duration, delay]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      preserveAspectRatio={preserveAspectRatio}
      className={className}
    >
      <motion.path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round" // punta redondeada para mejor apariencia
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        shapeRendering="geometricPrecision"
        animate={controls}
        initial={{ opacity: 0 }}
      />
    </svg>
  );
}
