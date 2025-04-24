import { useState } from "react";
import "./CopyButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import clsx from "clsx";

type CopyButtonProps = {
  size?: "sm" | "md" | "lg";
  text: string;
  className?: string;
};

export const CopyButton = ({ size = "sm", text, className = "" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Cannot copy text:", err);
    }
  };

  return (
    <div className={`copy-button-wrapper ${className}`}>
      <button className={clsx("copy-button", `copy-button--${size}`)} onClick={handleCopy}>
        {copied ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
        {copied && <p className="copied-text">Copied!</p>}
      </button>
    </div>
  );
};
