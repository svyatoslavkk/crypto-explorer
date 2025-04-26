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
        const res = await fetch(`http://localhost:5000/api/historical-prices/${coinId}/${days}`);
        const data = await res.json();
        console.log("data", data);
        setPrices(data);
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

  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
      return "Invalid date";
    }

    const day = dateObj.getDate().toString().padStart(2, "0");
    return `${day}`;
  };

  return { prices, days, setDays, loading, getHeight, formatDate };
};
