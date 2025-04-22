export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_data: {
    ath: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    fully_diluted_valuation: {
      usd: number;
    };
    price_change_percentage_24h: number;
  };
  market_cap_rank: number;
  image: { large: string };
}
