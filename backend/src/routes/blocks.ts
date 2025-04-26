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
    const latestBlockNumber = await provider.getBlockNumber();

    const blockPromises = Array.from({ length: 5 }, (_, i) =>
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
    console.error("Ошибка получения блоков:", error);
    res.status(500).json({ message: "Error fetching blocks" });
  }
});

export default router;
