import { GasData } from "../model/types";

export const fetchGasData = async (): Promise<GasData> => {
  const response = await fetch(
    `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch gas data");
  }
  const data = await response.json();
  const result = data.result;

  const gasData = {
    Rapid: Number(result.FastGasPrice),
    Fast: Number(result.ProposeGasPrice),
    Standard: Number(result.SafeGasPrice),
    Suggest: Number(result.suggestBaseFee),
  };
  return gasData;
};
