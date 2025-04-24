import { useEffect, useCallback, Dispatch, SetStateAction } from "react";
import { AssetSearchResultItem } from "../../../shared";

export function useKeyboardNavigation({
  items,
  inputRef,
  setActiveIndex,
  onEnter,
}: {
  items: AssetSearchResultItem[];
  inputRef: React.RefObject<HTMLInputElement | null>;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  onEnter: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!items.length) return;

      switch (e.key) {
        case "ArrowDown":
          setActiveIndex((prev: number) => (prev + 1) % items.length);
          break;
        case "ArrowUp":
          setActiveIndex((prev: number) => (prev - 1 + items.length) % items.length);
          break;
        case "Escape":
          inputRef.current?.focus();
          if (inputRef.current) inputRef.current.value = "";
          break;
        case "Enter":
          onEnter();
          break;
      }
    },
    [items, inputRef, onEnter]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
