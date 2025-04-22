import React, { ElementType, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import "../styles/typography.scss";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type Color = "primary" | "secondary";

interface HProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  color?: Color;
  children: ReactNode;
  className?: string;
}

export const H: React.FC<HProps> = ({
  level = 3,
  color = "primary",
  children,
  className,
  ...props
}) => {
  const Tag = `h${level}` as ElementType;
  return (
    <Tag className={clsx(`h${level}`, `text-${color}`, className)} {...props}>
      {children}
    </Tag>
  );
};

interface PProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "base" | "lg";
  color?: Color;
  className?: string;
  children: ReactNode;
}

export const P: React.FC<PProps> = ({
  size = "base",
  color = "primary",
  children,
  className,
  ...props
}) => {
  return (
    <p className={clsx(`p-${size}`, `text-${color}`, className)} {...props}>
      {children}
    </p>
  );
};
