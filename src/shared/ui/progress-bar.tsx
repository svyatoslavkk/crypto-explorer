import "../styles/progress-bar.scss";

interface ProgressBarProps {
  percentage: number;
  width?: number;
  height?: number;
  fullWidth?: boolean;
}

export const ProgressBar = ({
  percentage,
  width,
  height = 8,
  fullWidth = false,
}: ProgressBarProps) => {
  return (
    <div
      className="progress-bar"
      style={{
        width: fullWidth ? "100%" : width,
        height,
      }}
    >
      <div
        className="progress-bar__filled"
        style={{
          width: `${Math.min(Math.max(percentage, 0), 100)}%`,
        }}
      />
    </div>
  );
};
