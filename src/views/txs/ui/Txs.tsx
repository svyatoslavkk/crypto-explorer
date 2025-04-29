import { useEffect, useState } from "react";
import { H } from "../../../shared";
import "./Txs.scss";

type BlockData = {
  type: "newBlock";
  blockNumber: number;
  transactionsCount: number;
  timestamp: number;
};

type TradeData = {
  type: "newTrade";
  hash: string;
  amount: string;
  from: string;
  to: string;
};

type MessageData = BlockData | TradeData;

export const Txs = () => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [trades, setTrades] = useState<TradeData[]>([]);
  console.log("blocks", blocks);
  console.log("trades", trades);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000"); // Адрес твоего бэкенда

    socket.onmessage = event => {
      const data: MessageData = JSON.parse(event.data);

      if (data.type === "newBlock") {
        setBlocks(prev => [data, ...prev.slice(0, 10)]); // последние 10 блоков
      }

      if (data.type === "newTrade") {
        setTrades(prev => [data, ...prev.slice(0, 10)]); // последние 10 сделок
      }
    };

    socket.onopen = () => {
      console.log("WebSocket подключен");
    };

    socket.onclose = () => {
      console.log("WebSocket отключен");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <>
      <H level={4}>Txs</H>
      <div>
        <h2>Последние Блоки</h2>
        <ul>
          {blocks.map(block => (
            <li key={block.blockNumber}>
              Блок #{block.blockNumber} — Транзакций: {block.transactionsCount} — Время:{" "}
              {new Date(block.timestamp * 1000).toLocaleTimeString()}
            </li>
          ))}
        </ul>

        <h2>Последние Сделки</h2>
        <ul>
          {trades.map(trade => (
            <li key={trade.hash}>
              Сделка: {trade.hash.slice(0, 10)}... — {trade.amount} ETH — От:{" "}
              {trade.from.slice(0, 6)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Txs;
