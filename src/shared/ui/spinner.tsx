import "../styles/spinner.scss";

export const Spinner = ({
  size = "s",
  className,
}: {
  size?: "xs" | "s" | "m" | "l" | "xl";
  className?: string;
}) => {
  return <div className={`spinner spinner--${size} ${className}`} />;
};

export default Spinner;
