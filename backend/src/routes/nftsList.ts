import { Router } from "express";

const router = Router();

router.get("/nfts-list", async (req, res) => {
  const { order = "market_cap_desc", per_page = "10", page = "1" } = req.query;

  const url = new URL(`${process.env.COIN_GECKO_API_URL}/nfts/list`);
  url.searchParams.set("order", order.toString());
  url.searchParams.set("per_page", per_page.toString());
  url.searchParams.set("page", page.toString());
  try {
    const response = await fetch(url.toString(), {
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch coin data");

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
