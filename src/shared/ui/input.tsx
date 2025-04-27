import { InputHTMLAttributes, ReactNode, forwardRef, Ref } from "react";
import "../styles/input.scss";
import clsx from "clsx";

type Variant = "sm" | "md" | "lg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  left?: ReactNode;
  right?: ReactNode;
  variant?: Variant;
  className?: string;
  maxWidth?: string;
}

export const Input = forwardRef(
  (
    { left, right, variant = "md", className = "", maxWidth, ...props }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div
        className={clsx(
          "custom-input",
          `${left ? "custom-input--left" : ""}`,
          `${right ? "custom-input--right" : ""}`,
          className
        )}
        style={{ maxWidth }}
      >
        {left && <div className="custom-input__left">{left}</div>}
        <input ref={ref} className="custom-input__field" {...props} />
        {right && <div className="custom-input__right">{right}</div>}
      </div>
    );
  }
);
