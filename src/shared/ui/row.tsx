import { ReactNode } from "react";
import "../styles/row.scss";
import clsx from "clsx";

interface RowProps {
  children: ReactNode;
  gap?: 0 | 4 | 8 | 16 | 32;
  className?: string;
}

export const Row = ({ children, gap = 8, className }: RowProps) => {
  return <div className={clsx("flex-row", `flex-row--gap-${gap}`, className)}>{children}</div>;
};

export default Row;
