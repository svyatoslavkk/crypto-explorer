import clsx from "clsx";
import "../styles/container.scss";
import { ReactNode } from "react";

export const Container = ({ children, className }: { children: ReactNode; className: string }) => {
  return <div className={clsx(`container`, className)}>{children}</div>;
};

export default Container;
