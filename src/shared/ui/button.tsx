import { ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import "../styles/button.scss";

type Color = "default" | "primary" | "secondary" | "success" | "danger";
type Variant = "filled" | "outlined";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: Color;
  size?: Size;
  variant?: Variant;
}

export const Button = ({
  children,
  color = "default",
  size = "md",
  variant = "filled",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx("button", `button--${size}`, `${variant}-${color}`, className)}
      {...props}
    >
      {children}
    </button>
  );
};
