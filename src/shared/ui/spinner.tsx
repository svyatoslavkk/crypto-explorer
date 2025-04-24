import "../styles/spinner.scss";

export const Spinner = ({ size = "s" }: { size?: "xs" | "s" | "m" | "l" | "xl" }) => {
  return <div className={`spinner spinner--${size}`} />;
};

export default Spinner;
