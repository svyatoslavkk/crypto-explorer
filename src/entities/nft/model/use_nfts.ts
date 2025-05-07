import { useEffect, useState } from "react";
import { NftA } from "./types";

export const useNFTs = () => {
  const [nfts, setNfts] = useState<NftA[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          order: "market_cap_usd_desc",
          per_page: "100",
          page: String(page),
        });

        const res = await fetch(`http://localhost:5000/api/nfts-list?${params}`);
        const data: NftA[] = await res.json();

        if (Array.isArray(data)) {
          setNfts(prev => [...prev, ...data]);
          if (data.length < 100) setHasMore(false);
        } else {
          console.error("Invalid data format:", data);
          setHasMore(false);
        }
      } catch (e) {
        console.error("Error loading NFTs", e);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [page]);

  return { nfts, loading, hasMore, nextPage: () => setPage(p => p + 1) };
};
