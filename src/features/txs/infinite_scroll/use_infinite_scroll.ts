import { useEffect, useRef, useCallback } from "react";

export const useInfiniteScroll = (
  callback: () => void,
  hasNextPage: boolean,
  isFetching: boolean
) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetching) {
        callback();
      }
    },
    [callback, hasNextPage, isFetching]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  return { loaderRef };
};
