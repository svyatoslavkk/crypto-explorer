import { useEffect } from "react";

export function useScrollToActiveItem(
  refs: React.RefObject<(HTMLDivElement | null)[]>,
  containerRef: React.RefObject<HTMLDivElement | null>,
  activeIndex: number
) {
  useEffect(() => {
    const currentItem = refs.current?.[activeIndex];
    if (currentItem && containerRef.current) {
      currentItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeIndex]);
}
