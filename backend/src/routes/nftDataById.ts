import { Router } from "express";

const router = Router();

router.get("/nft-data/:nftId", async (req, res) => {
  const { nftId } = req.params;

  try {
    const response = await fetch(`${process.env.COIN_GECKO_API_URL}/nfts/${nftId}`);
    if (!response.ok) throw new Error("Failed to fetch NFT data");

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
