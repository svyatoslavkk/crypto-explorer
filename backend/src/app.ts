import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import blocks from "./routes/blocks";
import sepoliaTxs from "./routes/sepoliaTxs";
import gas from "./routes/gas";
import coins from "./routes/coins";
import historicalPrices from "./routes/historicalPrices";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
console.log("ETHERSCAN_API_KEY:", process.env.ETHERSCAN_API_KEY);
app.use("/api", blocks);
app.use("/api", sepoliaTxs);
app.use("/api", gas);
app.use("/api", coins);
app.use("/api", historicalPrices);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
