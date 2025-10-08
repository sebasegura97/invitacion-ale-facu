import * as React from "react";

type Props = {
  /** Alto del SVG en px (el ancho es 100% del contenedor) */
  height?: number;
  /** Grosor de la línea */
  strokeWidth?: number;
  /** Color de la línea y el punto */
  color?: string;
  /** Diámetro del punto en px */
  dotDiameter?: number;
  /** Duración total (izq→50% + 50%→100%) en segundos */
  duration?: number;
  /** Retraso inicial antes de empezar (segundos) */
  delay?: number;
  /** Callback al completar toda la animación */
  onComplete?: () => void;
  /** Forzar replay cambiando esta key desde afuera */
  replayKey?: React.Key;
  className?: string;
};

export default function SplitLineProgress({
  height = 24,
  strokeWidth = 3,
  color = "#111827",
  dotDiameter = 10,
  duration = 2,
  delay = 0,
  onComplete,
  replayKey,
  className,
}: Props) {
  const leftLineRef = React.useRef<SVGLineElement>(null);
  const rightLineRef = React.useRef<SVGLineElement>(null);
  const dotRef = React.useRef<SVGCircleElement>(null);

  React.useEffect(() => {
    let cancelled = false;
    let timeoutId: NodeJS.Timeout;

    async function run() {
      // Reset states
      if (leftLineRef.current) {
        leftLineRef.current.style.strokeDashoffset = "1";
      }
      if (rightLineRef.current) {
        rightLineRef.current.style.strokeDashoffset = "1";
      }
      if (dotRef.current) {
        dotRef.current.style.transform = "scale(0)";
        dotRef.current.style.opacity = "0";
      }

      // Delay inicial
      if (delay > 0) {
        await new Promise((resolve) => {
          timeoutId = setTimeout(resolve, delay * 1000);
        });
      }
      if (cancelled) return;

      // 1) Línea izquierda 0% → 50%
      if (leftLineRef.current) {
        leftLineRef.current.style.transition = `stroke-dashoffset ${
          duration * 0.5
        }s linear`;
        leftLineRef.current.style.strokeDashoffset = "0";
      }
      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, duration * 0.5 * 1000);
      });
      if (cancelled) return;

      // 2) Punto "pop" en el 50%
      if (dotRef.current) {
        dotRef.current.style.transition =
          "transform 0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.35s ease";
        dotRef.current.style.transform = "scale(1)";
        dotRef.current.style.opacity = "1";
      }
      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, 350);
      });
      if (cancelled) return;

      // 3) Línea derecha 50% → 100%
      if (rightLineRef.current) {
        rightLineRef.current.style.transition = `stroke-dashoffset ${
          duration * 0.5
        }s linear`;
        rightLineRef.current.style.strokeDashoffset = "0";
      }
      await new Promise((resolve) => {
        timeoutId = setTimeout(resolve, duration * 0.5 * 1000);
      });

      onComplete?.();
    }

    run();

    return () => {
      cancelled = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [replayKey, duration, delay, onComplete]);

  /**
   * Usamos un viewBox 0..100 en X para posicionar fácil:
   * - Línea izquierda: 0 → 50 (con gap de 16px antes del punto)
   * - Punto: x=50
   * - Línea derecha: 50 → 100 (con gap de 16px después del punto)
   */
  const vbHeight = 10; // altura virtual del viewBox
  const vbWidth = 100; // ancho virtual del viewBox
  const mid = 50;
  const cy = vbHeight / 2;

  // Convertir 16px a unidades del viewBox (asumiendo que el SVG tiene width="100%")
  // 16px del ancho total del contenedor se convierte en unidades del viewBox
  const gapUnits = (16 / vbWidth) * 100; // gap en unidades del viewBox
  const leftEnd = mid - gapUnits;
  const rightStart = mid + gapUnits;

  // Calcular el radio del círculo considerando la relación de aspecto
  // Como el viewBox es 100x10, necesitamos ajustar el radio para que sea circular
  const aspectRatio = vbWidth / vbHeight; // 100/10 = 10
  const circleRadius = dotDiameter / 2 / aspectRatio;

  return (
    <svg
      className={className}
      width="100%"
      height={height}
      viewBox={`0 0 100 ${vbHeight}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Split line progress"
    >
      {/* Línea base tenue (opcional, para ver el recorrido completo) */}
      <line
        x1={0}
        y1={cy}
        x2={100}
        y2={cy}
        stroke={color}
        strokeOpacity={0.15}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Segmento izquierdo (0 → leftEnd) */}
      <line
        ref={leftLineRef}
        x1={0}
        y1={cy}
        x2={leftEnd}
        y2={cy}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        style={{ strokeDashoffset: 1 }}
      />

      {/* Punto en el 50% - círculo perfecto */}
      <circle
        ref={dotRef}
        cx={mid}
        cy={cy}
        r={circleRadius}
        fill={color}
        style={{
          transform: "scale(0)",
          opacity: 0,
          transformOrigin: "50% 50%",
        }}
      />

      {/* Segmento derecho (rightStart → 100) */}
      <line
        ref={rightLineRef}
        x1={rightStart}
        y1={cy}
        x2={100}
        y2={cy}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="1"
        style={{ strokeDashoffset: 1 }}
      />
    </svg>
  );
}
