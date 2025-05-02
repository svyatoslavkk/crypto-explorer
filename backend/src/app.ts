import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import blocks from "./routes/blocks";
import sepoliaTxs from "./routes/sepoliaTxs";
import gas from "./routes/gas";
import nftsList from "./routes/nftsList";
import nftDataById from "./routes/nftDataById";
import coins from "./routes/coins";
import historicalPrices from "./routes/historicalPrices";
import { setupWebSocket } from "./websocket";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use("/api", blocks);
app.use("/api", sepoliaTxs);
app.use("/api", gas);
app.use("/api", nftsList);
app.use("/api", nftDataById);
app.use("/api", coins);
app.use("/api", historicalPrices);

const server = createServer(app);
setupWebSocket(server);

server.listen(PORT, () => {
  console.log(`HTTP + WebSocket Server is running on port ${PORT}`);
});
