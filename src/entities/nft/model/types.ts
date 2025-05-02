export type Nft = {
  id: string;
  name: string;
  symbol: string;
  contract_address: string;
  asset_platform_id: string;
};

export type NftDetail = {
  name: string;
  description: string;
  contract_address: string;
  image: { small: string; small_2x: string };
  market_cap_rank: number;
  native_currency_symbol: string;
  native_currency: string;
  one_day_sales: number;
  floor_price: { native_currency: number };
  market_cap: { native_currency: number };
  total_supply: number;
};
