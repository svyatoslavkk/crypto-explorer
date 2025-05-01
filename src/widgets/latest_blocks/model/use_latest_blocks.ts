import { useEffect, useRef, useState } from "react";

export type BlockInfo = {
  number: number;
  hash: string | null;
  timestamp: number;
  transactions: readonly string[];
};

export const useLatestBlocks = (enableWebSocket: boolean = true) => {
  const [blocks, setBlocks] = useState<BlockInfo[]>([]);
  const [oldestBlockNumber, setOldestBlockNumber] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const wsRef = useRef<WebSocket | null>(null);

  const fetchOlderBlocks = async (limit: number = 10) => {
    if (isLoading || oldestBlockNumber === null || !hasMore) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/blocks?before=${oldestBlockNumber}&limit=${limit}`
      );
      if (!response.ok) throw new Error("Error fetching older blocks");

      const data: BlockInfo[] = await response.json();

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setBlocks(prev => [...prev, ...data]);
      setOldestBlockNumber(data[data.length - 1].number);
    } catch (error) {
      console.error("Error fetching older blocks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blocks");
        if (!response.ok) throw new Error("Error fetching blocks");

        const data: BlockInfo[] = await response.json();
        setBlocks(data);
        if (data.length > 0) {
          setOldestBlockNumber(data[data.length - 1].number);
        }
      } catch (error) {
        console.error("Error fetching blocks:", error);
      }
    };

    fetchBlocks();
  }, []);

  useEffect(() => {
    if (!enableWebSocket) return;

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

          setBlocks(prev => {
            if (prev.find(b => b.number === newBlock.number)) return prev;
            return [newBlock, ...prev];
          });
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    };

    return () => {
      ws.close(1000, "Component unmounted");
      wsRef.current = null;
    };
  }, [enableWebSocket]);

  return { blocks, fetchOlderBlocks, isLoading, hasMore };
};
