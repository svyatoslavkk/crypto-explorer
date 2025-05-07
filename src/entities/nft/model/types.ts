export type NftA = {
  id: string;
  name: string;
  symbol: string;
  contract_address: string;
  asset_platform_id: string;
};

export type NftB = {
  collection_address: string;
  collection_image: string;
  collection_title: string;
  floor_price: string;
  floor_price_24hr_percent_change: string;
  floor_price_usd: string;
  floor_price_usd_24hr_percent_change: string;
  market_cap_24hr_percent_change: string;
  market_cap_usd: string;
  rank: number;
  volume_24hr_percent_change: string;
  volume_usd: string;
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
