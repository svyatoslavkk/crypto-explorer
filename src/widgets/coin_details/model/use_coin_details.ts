import { useEffect, useState } from "react";
import { CoinData } from "../../../shared/types";

export const useCoinDetails = (coinId: string) => {
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCoinData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.COIN_GECKO_API_URL}/coins/${coinId}?sparkline=true`);
        if (!res.ok) throw new Error("Failed to fetch coin data");
        const data = await res.json();
        setCoinData(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    getCoinData();
  }, [coinId]);

  return { coinData, error, loading };
};
