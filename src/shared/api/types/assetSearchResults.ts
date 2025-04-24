export interface AssetSearchResultCoin {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

export interface AssetSearchResultExchange {
  id: string;
  name: string;
  market_type: string;
  thumb: string;
  large: string;
}

export interface AssetSearchResultICO {
  id: string;
  name: string;
}

export interface AssetSearchResultCategory {
  id: string;
  name: string;
}

export interface AssetSearchResultNFT {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

export interface AssetSearchResults {
  coins: AssetSearchResultCoin[];
  exchanges: AssetSearchResultExchange[];
  icos: AssetSearchResultICO[];
  categories: AssetSearchResultCategory[];
  nfts: AssetSearchResultNFT[];
}

export type AssetSearchResultItem =
  | AssetSearchResultCoin
  | AssetSearchResultNFT
  | AssetSearchResultExchange
  | AssetSearchResultCategory
  | AssetSearchResultICO;
