import { ethers } from "ethers";
import { useEffect, useState } from "react";

type BlockInfo = {
  number: number;
  hash: string | null;
  timestamp: number;
  transactions: readonly string[];
};

export const useLatestBlocks = () => {
  const [blocks, setBlocks] = useState<BlockInfo[]>([]);

  useEffect(() => {
    const fetchBlocks = async () => {
      const provider = new ethers.JsonRpcProvider(
        `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
      );

      try {
        const latestBlockNumber = await provider.getBlockNumber();

        const blockPromises = Array.from({ length: 5 }, (_, i) =>
          provider.getBlock(latestBlockNumber - i)
        );

        const blockData = await Promise.all(blockPromises);
        if (blockData) {
          const parsedBlocks: BlockInfo[] = blockData
            .filter((block): block is NonNullable<typeof block> => block !== null)
            .map(block => ({
              number: block.number,
              hash: block.hash,
              timestamp: block.timestamp,
              transactions: block.transactions,
            }));

          setBlocks(parsedBlocks);
        }
      } catch (error) {
        console.error("Ошибка получения блоков:", error);
      }
    };

    fetchBlocks();
  }, []);

  return { blocks };
};
