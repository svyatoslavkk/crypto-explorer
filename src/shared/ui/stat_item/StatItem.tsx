import React from "react";
import { H, P } from "..";
import "./StatItem.scss";

interface StatItemProps {
  label: string;
  value: string | number;
  valueLevel?: 4 | 5 | 6;
  headlineFirst?: boolean;
  className?: string;
}

export const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
  valueLevel = 5,
  headlineFirst = false,
  className,
}) => {
  return (
    <div
      className={`stat-item ${className || ""} ${headlineFirst ? "stat-item--headline-first" : ""}`}
    >
      <P color="secondary" size="sm">
        {label}
      </P>
      <H level={valueLevel}>{value}</H>
    </div>
  );
};
