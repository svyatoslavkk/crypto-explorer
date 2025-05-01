import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  callback: () => void;
  hasMore?: boolean;
  threshold?: number;
}

export const useInfiniteScroll = ({
  callback,
  hasMore = true,
  threshold = 1,
}: UseInfiniteScrollProps) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) callback();
      },
      { threshold }
    );

    const current = loaderRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [callback, hasMore, threshold]);

  return loaderRef;
};
