import { Router } from "express";

const router = Router();

router.get("/coin/:coinId", async (req, res) => {
  const { coinId } = req.params;

  try {
    const response = await fetch(
      `${process.env.COIN_GECKO_API_URL}/coins/${coinId}?sparkline=true`
    );
    if (!response.ok) throw new Error("Failed to fetch coin data");

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
