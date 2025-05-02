import { useEffect, useState } from "react";
import { NftDetail } from "./types";

export const useNftDetails = (id: string | null) => {
  const [data, setData] = useState<NftDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    const fetchDetail = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/nft-data/${id}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Error loading NFT detail", e);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  return { data, loading };
};
