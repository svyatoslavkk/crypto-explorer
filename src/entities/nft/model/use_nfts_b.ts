import { useEffect, useState } from "react";
import { NftB } from "./types";

export const useNFTsB = () => {
  const [nfts, setNfts] = useState<NftB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopNFTCollections = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://deep-index.moralis.io/api/v2.2/market-data/nfts/top-collections",
          {
            headers: {
              "X-API-Key": process.env.MORALIS_API_KEY as string,
              accept: "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch top NFT collections");
        }

        const data = await res.json();
        setNfts(data);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopNFTCollections();
  }, []);

  return { nfts, loading };
};
