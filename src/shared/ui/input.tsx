import { InputHTMLAttributes, ReactNode, forwardRef, Ref } from "react";
import "../styles/input.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  left?: ReactNode;
  right?: ReactNode;
  className?: string;
}
export const Input = forwardRef(
  ({ left, right, className = "", ...props }: InputProps, ref: Ref<HTMLInputElement>) => {
    return (
      <div className={`custom-input ${className}`}>
        {left && <div className="custom-input__left">{left}</div>}
        <input ref={ref} className="custom-input__field" {...props} />
        {right && <div className="custom-input__right">{right}</div>}
      </div>
    );
  }
);
