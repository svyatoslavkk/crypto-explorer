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
      try {
        const response = await fetch("http://localhost:5000/api/blocks");
        if (!response.ok) {
          throw new Error("Error fetching blocks");
        }

        const data: BlockInfo[] = await response.json();
        setBlocks(data);
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    };

    fetchBlocks();
  }, []);

  return { blocks };
};
