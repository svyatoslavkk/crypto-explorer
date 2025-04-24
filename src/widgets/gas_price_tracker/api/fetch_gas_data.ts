import { GasData } from "../model/types";

export const fetchGasData = async (): Promise<GasData> => {
  const response = await fetch(
    `${process.env.ETHERSCAN_API_URL}/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_API_KEY}`
  );
  const data = await response.json();
  const result = data.result;

  return {
    Rapid: Number(result.FastGasPrice),
    Fast: Number(result.ProposeGasPrice),
    Standard: Number(result.SafeGasPrice),
    Suggest: Number(result.suggestBaseFee),
  };
};
