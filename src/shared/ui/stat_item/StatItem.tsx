import React from "react";
import { H, P } from "..";
import "./StatItem.scss";

interface StatItemProps {
  label: string;
  value: string | number;
  valueLevel?: 4 | 5 | 6;
  className?: string;
}

export const StatItem: React.FC<StatItemProps> = ({ label, value, valueLevel = 5, className }) => {
  return (
    <div className={`stat-item ${className || ""}`}>
      <P color="secondary" size="sm">
        {label}
      </P>
      <H level={valueLevel}>{value}</H>
    </div>
  );
};
