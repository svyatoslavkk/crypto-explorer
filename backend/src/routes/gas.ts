import { Router } from "express";

const router = Router();

router.get("/gas", async (req, res) => {
  try {
    const response = await fetch(
      `${process.env.ETHERSCAN_API_URL}/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch transactions");
    const data = await response.json();
    const result = data.result;

    const gasData = {
      Rapid: Number(result.FastGasPrice),
      Fast: Number(result.ProposeGasPrice),
      Standard: Number(result.SafeGasPrice),
      Suggest: Number(result.suggestBaseFee),
    };

    res.json(gasData);
  } catch (error) {
    console.error("Error fetching gas data:", error);
    res.status(500).json({ message: "Error fetching gas data" });
  }
});

export default router;
