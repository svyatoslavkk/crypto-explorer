import { ethers } from "ethers";
import { WebSocketServer } from "ws";

export const startEthWebSocket = (wss: WebSocketServer) => {
  const provider = new ethers.WebSocketProvider(
    `wss://sepolia.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
  );

  provider.on("block", async blockNumber => {
    console.log(`New block: ${blockNumber}`);

    const block = await provider.getBlock(blockNumber);

    wss.clients.forEach(client => {
      if (client.readyState === 1) {
        client.send(
          JSON.stringify({
            type: "newBlock",
            blockNumber,
            transactionsCount: block?.transactions.length,
            timestamp: block?.timestamp,
          })
        );
      }
    });
  });

  const tokenAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7".toLowerCase();
  const transferMethodId = "0xa9059cbb";

  provider.on("pending", async txHash => {
    try {
      const tx = await provider.getTransaction(txHash);

      if (!tx) return;

      if (tx.to?.toLowerCase() === tokenAddress && tx.data.startsWith(transferMethodId)) {
        const decoded = ethers.AbiCoder.defaultAbiCoder().decode(
          ["address", "uint256"],
          "0x" + tx.data.slice(10)
        );

        const recipient = decoded[0];
        const amount = decoded[1];

        console.log("Новая сделка по токену USDT:", {
          from: tx.from,
          to: recipient,
          amount: ethers.formatUnits(amount, 6),
        });

        wss.clients.forEach(client => {
          if (client.readyState === 1) {
            client.send(
              JSON.stringify({
                type: "newTrade",
                from: tx.from,
                to: recipient,
                amount: ethers.formatUnits(amount, 6),
                hash: tx.hash,
              })
            );
          }
        });
      }
    } catch (error) {
      console.error("Ошибка при обработке pending транзакции", error);
    }
  });
};
