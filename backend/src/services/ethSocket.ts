import { ethers } from "ethers";
import { WebSocketServer } from "ws";

export const startEthWebSocket = (wss: WebSocketServer) => {
  const provider = new ethers.WebSocketProvider(
    `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
  );

  provider.on("block", async blockNumber => {
    const block = await provider.getBlock(blockNumber);
    console.log("New block: " + JSON.stringify(block, null, 2));

    wss.clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            type: "newBlock",
            blockNumber,
            transactionsCount: block?.transactions.length,
            timestamp: block?.timestamp,
            hash: block?.hash,
          })
        );
      }
    });
  });
};
