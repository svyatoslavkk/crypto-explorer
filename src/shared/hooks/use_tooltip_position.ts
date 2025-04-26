import { RefObject, useEffect, useRef, useState } from "react";

interface TooltipSize {
  width: number;
  height: number;
}

export function useTooltipPosition(
  refElement: RefObject<HTMLDivElement | null>,
  tooltipSize: TooltipSize
) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (
        refElement.current &&
        tooltipRef.current &&
        !refElement.current.contains(e.target as Node) &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, refElement]);

  const openTooltip = () => {
    if (!refElement.current) return;

    const rect = refElement.current.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let top = rect.bottom + 8;
    let left = rect.left;

    if (windowHeight - rect.bottom < tooltipSize.height + 10) {
      top = rect.top - tooltipSize.height - 8;
    }

    if (windowWidth - rect.left < tooltipSize.width) {
      left = rect.right - tooltipSize.width;
    }

    setPosition({ top, left });
    setIsOpen(true);
  };

  return { isOpen, setIsOpen, openTooltip, position, tooltipRef };
}
