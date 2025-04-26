import { Router } from "express";

const getHistoricalPrices = async (coinId: string, days: number) => {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    );
    const data = await res.json();

    const dailyPrices = data.prices.map(([timestamp, price]: [number, number]) => ({
      date: new Date(timestamp),
      price,
    }));

    return dailyPrices.slice(0, -1);
  } catch (error) {
    console.error("Ошибка получения исторических цен:", error);
    throw new Error("Error fetching historical prices");
  }
};

const router = Router();

router.get("/historical-prices/:coinId/:days", async (req, res) => {
  const { coinId, days } = req.params;

  try {
    const prices = await getHistoricalPrices(coinId, parseInt(days, 10));
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching historical prices" });
  }
});

export default router;
