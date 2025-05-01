import { useEffect, useRef, useState } from "react";

export type BlockInfo = {
  number: number;
  hash: string | null;
  timestamp: number;
  transactions: readonly string[];
};

export const useLatestBlocks = () => {
  const [blocks, setBlocks] = useState<BlockInfo[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blocks");
        if (!response.ok) throw new Error("Error fetching blocks");

        const data: BlockInfo[] = await response.json();
        setBlocks(data);
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    };

    fetchBlocks();
  }, []);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");
    wsRef.current = ws;

    ws.onmessage = event => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "newBlock") {
          const newBlock: BlockInfo = {
            number: msg.blockNumber,
            hash: msg.hash,
            timestamp: msg.timestamp,
            transactions: Array(msg.transactionsCount).fill(""),
          };

          setBlocks(prev => [newBlock, ...prev].slice(0, 20));
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return { blocks };
};
