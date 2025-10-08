import { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import CircularProgress from "./CircularProgress";

interface ButtonWithProgressImplProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  autoProgressDelay?: number;
  autoProgressDuration?: number;
  onAutoComplete?: () => void;
  disabled?: boolean;
  className?: string;
  progressSize?: "sm" | "md" | "lg";
  backgroundAnimationDelay?: number;
  icon?: LucideIcon;
  delayIconAnimation?: number;
}

export default function ButtonWithProgressImpl({
  children,
  onClick,
  variant = "primary",
  size = "md",
  autoProgressDelay = 0,
  autoProgressDuration = 15000,
  onAutoComplete,
  disabled = false,
  className = "",
  progressSize = "md",
  backgroundAnimationDelay = 0,
  icon: Icon,
  delayIconAnimation = 0,
}: ButtonWithProgressImplProps) {
  const [progress, setProgress] = useState(0);
  const [isAutoProgressing, setIsAutoProgressing] = useState(false);
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Iniciar el progreso automático después del delay
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsAutoProgressing(true);
      setProgress(0);
    }, autoProgressDelay);

    return () => clearTimeout(startTimer);
  }, [autoProgressDelay]);

  // Manejar el progreso automático
  useEffect(() => {
    if (!isAutoProgressing || hasBeenClicked) return;

    const interval = 50; // Actualizar cada 50ms para suavidad
    const increment = (interval / autoProgressDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsAutoProgressing(false);
          setIsCompleted(true);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoProgressing, autoProgressDuration, hasBeenClicked]);

  // Llamar a onAutoComplete cuando se complete el progreso
  useEffect(() => {
    if (isCompleted && onAutoComplete) {
      onAutoComplete();
    }
  }, [isCompleted, onAutoComplete]);

  const baseClasses =
    "font-semibold rounded-lg transition-colors relative overflow-hidden flex items-center justify-center";

  const variantClasses = {
    primary: "bg-wedding-text text-wedding-bg hover:bg-opacity-90",
    secondary: "bg-transparent text-white",
    outline:
      "border-2 border-wedding-text text-wedding-text hover:bg-wedding-text hover:text-wedding-bg",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  const progressPositionClasses = {
    sm: "right-2",
    md: "right-3",
    lg: "right-4",
  };

  // Siempre reservar espacio para el progress para evitar saltos de layout
  const contentSpacingClasses = {
    sm: "mr-3", // Siempre mantener el margen derecho para el progress
    md: "mr-5",
    lg: "mr-7",
  };

  const handleClick = () => {
    if (hasBeenClicked) return; // Evitar múltiples clicks

    setHasBeenClicked(true);
    setIsAutoProgressing(false);
    setProgress(0);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${className}
      `}
    >
      {/* Animación de fondo para variant secondary */}
      {variant === "secondary" && (
        <motion.div
          className="absolute inset-0 bg-gray-600 z-0"
          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
          animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          transition={{
            duration: 1.5,
            delay: backgroundAnimationDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      )}
      <div
        className={`${contentSpacingClasses[size]} relative z-10 flex items-center justify-center gap-2`}
      >
        {/* Icono con animación de pop */}
        {Icon && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: delayIconAnimation,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
              damping: 12,
            }}
            className="flex items-center"
          >
            <Icon className={iconSizeClasses[size]} />
          </motion.span>
        )}
        {children}
      </div>
      {/* Circular Progress - siempre presente pero con opacidad */}
      <div
        className={`${
          progressPositionClasses[size]
        } absolute top-1/2 transform -translate-y-1/2 transition-opacity duration-300 z-10 ${
          isAutoProgressing ? "opacity-100" : "opacity-0"
        }`}
      >
        <CircularProgress progress={progress} size={progressSize} />
      </div>
    </button>
  );
}
