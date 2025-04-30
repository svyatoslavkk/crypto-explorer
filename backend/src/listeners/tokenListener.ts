import { ethers } from "ethers";
import { WebSocketServer } from "ws";
import WebSocket from "ws";

const ALCHEMY_WS_URL = `wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const TOKEN_ADDRESS = "0x15095ec8fb1fc9c664b3223459dff43158ace7ad";

const provider = new ethers.JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
);

const getBlockTimestamp = async (blockHash: string) => {
  const block = await provider.getBlock(blockHash);
  return block?.timestamp ? block.timestamp * 1000 : null;
};

export const tokenListener = (wss: WebSocketServer) => {
  const ws = new WebSocket(ALCHEMY_WS_URL);

  ws.on("open", () => {
    console.log("WebSocket connected");

    const subscriptionMessage = {
      id: 1,
      method: "eth_subscribe",
      params: [
        "alchemy_minedTransactions",
        {
          address: TOKEN_ADDRESS,
        },
      ],
    };
    ws.send(JSON.stringify(subscriptionMessage));
  });

  ws.on("message", async data => {
    const parsedData = JSON.parse(data.toString());

    if (parsedData.method === "eth_subscription") {
      const tx = parsedData.params.result.transaction;
      const blockHash = tx.blockHash;

      let timestamp: number | null = null;

      try {
        const block = await provider.getBlock(blockHash);
        timestamp = await getBlockTimestamp(blockHash);
      } catch (error) {
        console.error("Ошибка получения блока:", error);
      }

      const transferData = {
        from: tx.from,
        to: tx.to,
        value: tx.value,
        txHash: tx.hash,
        timestamp,
      };

      console.log("📤 Broadcasting Wallet Tx:", transferData);

      // Рассылаем клиентам
      wss.clients.forEach(client => {
        if (client.readyState === 1) {
          client.send(JSON.stringify(transferData));
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });

  ws.on("error", error => {
    console.log("WebSocket error:", error);
  });
};
