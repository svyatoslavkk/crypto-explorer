import { ReactNode } from "react";
import "../styles/column.scss";
import clsx from "clsx";

interface ColumnProps {
  children: ReactNode;
  gap?: 0 | 4 | 8 | 16 | 32;
  className?: string;
}

export const Column = ({ children, gap = 8, className }: ColumnProps) => {
  return (
    <div className={clsx("flex-column", `flex-column--gap-${gap}`, className)}>{children}</div>
  );
};

export default Column;
