export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  market_data: {
    ath: {
      usd: number;
    };
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    fully_diluted_valuation: {
      usd: number;
    };
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
  };
  market_cap_rank: number;
  image: { large: string };
}

export interface EthTx {
  blockHash: string;
  blockNumber: string;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  functionName: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  isError: string;
  methodId: string;
  nonce: string;
  timeStamp: string;
  to: string;
  transactionIndex: string;
  txreceipt_status: string;
  value: string;
}
