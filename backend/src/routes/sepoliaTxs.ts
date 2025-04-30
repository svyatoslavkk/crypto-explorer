import { Router } from "express";

const router = Router();

router.get("/sepoliaTxs/:address", async (req, res) => {
  const { address } = req.params;
  const { page = "1", offset = "8" } = req.query;

  try {
    const response = await fetch(
      `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=${address}&page=${page}&offset=${offset}&sort=desc&apikey=${process.env.ETHERSCAN_API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch transactions");

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
});

export default router;
