import { ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import "../styles/button.scss";

type Color = "default" | "primary" | "secondary" | "success" | "danger";
type Variant = "filled" | "outlined";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: Color;
  variant?: Variant;
}

export const Button = ({
  children,
  color = "default",
  variant = "filled",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button className={clsx("button", `${variant}-${color}`, className)} {...props}>
      {children}
    </button>
  );
};
