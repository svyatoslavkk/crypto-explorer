import { useEffect, useState } from "react";
import { NftDetail } from "./types";

export const useNftDetailsByContract = (contract_address: string | null) => {
  const [data, setData] = useState<NftDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!contract_address) return;
    setLoading(true);

    const fetchDetail = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/nft-data-by-contract/ethereum/${contract_address}`
        );
        if (!res.ok) throw new Error("Error fetching NFT details");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Error loading NFT detail", e);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [contract_address]);

  return { data, loading };
};
