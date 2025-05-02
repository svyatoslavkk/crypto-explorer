import { useEffect, useRef } from "react";
import { useNFTs } from "../../../entities/nft";

export const useNftInfiniteScroll = () => {
  const { nfts, loading, hasMore, nextPage } = useNFTs();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current || loading) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) {
        nextPage();
      }
    });

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading, hasMore]);

  return { nfts, loading, loaderRef };
};
