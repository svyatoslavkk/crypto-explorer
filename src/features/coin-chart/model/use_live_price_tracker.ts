import { useEffect, useState } from "react";

type PricePoint = {
  date: Date;
  price: number;
};

export const useLivePriceTracker = (coinId: string) => {
  const [prices, setPrices] = useState<PricePoint[]>([]);
  const [days, setDays] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`
        );
        const data = await res.json();
        const dailyPrices = data.prices.map(([timestamp, price]: [number, number]) => ({
          date: new Date(timestamp),
          price,
        }));

        setPrices(dailyPrices.slice(0, -1));
      } catch (error) {
        console.error("Ошибка получения исторических цен:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [coinId, days]);

  const max = Math.max(...prices.map(p => p.price));
  const min = Math.min(...prices.map(p => p.price));

  const getHeight = (value: number) => {
    if (max === min) return 50;
    const normalized = ((value - min) / (max - min)) * 100;
    return Math.max(5, normalized);
  };

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}`;
  };

  return { prices, days, setDays, loading, getHeight, formatDate };
};
