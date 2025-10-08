import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import ButtonWithProgressImpl from "./ButtonWithProgressImpl";

// Props base para el Button simple
interface BaseButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  backgroundAnimationDelay?: number; // delay para la animación del background (en segundos)
  icon?: LucideIcon; // icono de lucide-react
  delayIconAnimation?: number; // delay para la animación del icono (en segundos)
}

// Props específicas para el Button con progreso automático
interface AutoProgressButtonProps extends BaseButtonProps {
  autoProgress: true;
  autoProgressDelay?: number; // milisegundos antes de iniciar el progreso
  autoProgressDuration?: number; // duración del progreso en milisegundos
  onAutoComplete?: () => void; // función que se ejecuta al completar el progreso
  progressSize?: "sm" | "md" | "lg";
}

// Props específicas para el Button sin progreso automático
interface RegularButtonProps extends BaseButtonProps {
  autoProgress?: false;
}

// Unión de tipos para las props del componente
type ButtonProps = AutoProgressButtonProps | RegularButtonProps;

// Componente Button simple (sin progreso automático)
function SimpleButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  backgroundAnimationDelay = 0,
  icon: Icon,
  delayIconAnimation = 0,
}: BaseButtonProps) {
  const baseClasses =
    "font-semibold rounded-lg transition-colors flex items-center justify-center hover:cursor-pointer relative overflow-hidden";

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

  return (
    <button
      onClick={onClick}
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
          className="absolute inset-0 bg-black opacity-10 z-0"
          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
          animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          transition={{
            duration: 1.5,
            delay: backgroundAnimationDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">
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
      </span>
    </button>
  );
}

function ButtonWithProgress({
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
  icon,
  delayIconAnimation = 0,
}: AutoProgressButtonProps) {
  return (
    <ButtonWithProgressImpl
      onClick={onClick}
      variant={variant}
      size={size}
      autoProgressDelay={autoProgressDelay}
      autoProgressDuration={autoProgressDuration}
      onAutoComplete={onAutoComplete}
      disabled={disabled}
      className={className}
      progressSize={progressSize}
      backgroundAnimationDelay={backgroundAnimationDelay}
      icon={icon}
      delayIconAnimation={delayIconAnimation}
    >
      {children}
    </ButtonWithProgressImpl>
  );
}

// Componente principal que decide qué implementación usar
export default function Button(props: ButtonProps) {
  if (props.autoProgress === true) {
    return <ButtonWithProgress {...props} />;
  }

  return <SimpleButton {...props} />;
}
