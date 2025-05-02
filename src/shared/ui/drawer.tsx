import { ReactNode, useEffect } from "react";
import "../styles/drawer.scss";
import { Button } from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { H } from "./typography";

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  overlayType?: "dark" | "blur";
};

export const Drawer = ({ isOpen, onClose, children, title, overlayType = "dark" }: DrawerProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <div className={`drawer ${isOpen ? "open" : ""}`}>
      <div className={`drawer__overlay drawer__overlay--${overlayType}`} onClick={onClose} />
      <div className="drawer__container">
        <div className="drawer__container__header">
          {title && <H level={4}>{title}</H>}
          <Button variant="outlined" onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </Button>
        </div>
        <div className="drawer__body">{children}</div>
      </div>
    </div>
  );
};
