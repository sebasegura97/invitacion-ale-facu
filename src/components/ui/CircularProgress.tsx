interface CircularProgressProps {
  progress: number; // 0-100
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

export default function CircularProgress({
  progress,
  size = "md",
  color = "currentColor",
  className = "",
}: CircularProgressProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-7 h-7",
  };

  const strokeWidth = {
    sm: "2.5",
    md: "3",
    lg: "3.5",
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        className="transform -rotate-90"
        viewBox="0 0 36 36"
        style={{ color }}
      >
        {/* Círculo de fondo */}
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth[size]}
          strokeOpacity="0.3"
        />
        {/* Círculo de progreso */}
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth[size]}
          strokeDasharray={`${progress}, 100`}
          strokeLinecap="round"
          className="transition-all duration-100 ease-linear"
        />
      </svg>
    </div>
  );
}
