import clsx from "clsx";
import "../styles/container.scss";
import { ReactNode } from "react";

type Color = "default" | "primary" | "secondary";

export const Container = ({
  color = "default",
  children,
  className,
}: {
  color?: Color;
  children: ReactNode;
  className: string;
}) => {
  return <div className={clsx(`container container--${color}`, className)}>{children}</div>;
};

export default Container;
