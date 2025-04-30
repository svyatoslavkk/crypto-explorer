import { useEffect, useRef, useState } from "react";

export const useTokenPriceLive = (symbol: string = "eth") => {
  const [price, setPrice] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const url = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@ticker`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {};

    ws.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        const rawPrice = parseFloat(data.c);

        if (!isNaN(rawPrice)) {
          const formatted = rawPrice < 0.2 ? rawPrice.toFixed(4) : rawPrice.toFixed(2);
          setPrice(formatted);
        } else {
          setPrice(null);
        }
      } catch (err) {
        console.error("[WebSocket] Error parsing message:", err);
      }
    };

    ws.onerror = err => {};

    ws.onclose = event => {};

    return () => {
      ws.close();
    };
  }, [symbol]);

  return price;
};
