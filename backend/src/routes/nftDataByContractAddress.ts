import { Router } from "express";

const router = Router();

router.get("/nft-data-by-contract/:asset_platform_id/:contract_address", async (req, res) => {
  const { asset_platform_id, contract_address } = req.params;

  try {
    const response = await fetch(
      `${process.env.COIN_GECKO_API_URL}/nfts/${asset_platform_id}/contract/${contract_address}`
    );
    if (!response.ok) throw new Error("Failed to fetch NFT data");

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
