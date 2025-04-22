import React from "react";
import "../styles/chip.scss";

interface ChipProps {
  label: string;
  color?: "default" | "primary" | "secondary" | "success" | "danger";
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  color = "default",
  onClick,
  icon,
  className,
}) => {
  return (
    <div
      className={`chip chip--${color} ${onClick ? "chip--clickable" : ""} ${className || ""}`}
      onClick={onClick}
    >
      {icon && <span className="chip__icon">{icon}</span>}
      <span className="chip__label">{label}</span>
    </div>
  );
};

export default Chip;
