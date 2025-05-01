import { Router } from "express";
import { JsonRpcProvider } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.get("/blocks", async (req, res) => {
  const provider = new JsonRpcProvider(
    `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
  );

  try {
    const before = parseInt(req.query.before as string);
    const limit = parseInt(req.query.limit as string) || 5;

    const latestBlockNumber = isNaN(before) ? await provider.getBlockNumber() : before - 1;

    const blockPromises = Array.from({ length: limit }, (_, i) =>
      provider.getBlock(latestBlockNumber - i)
    );

    const blockData = await Promise.all(blockPromises);

    const parsedBlocks = blockData
      .filter(block => block !== null)
      .map(block => ({
        number: block.number,
        hash: block.hash,
        timestamp: block.timestamp,
        transactions: block.transactions,
      }));

    res.json(parsedBlocks);
  } catch (error) {
    console.error("Error fetching blocks:", error);
    res.status(500).json({ message: "Error fetching blocks" });
  }
});

export default router;
