import { useMemo } from "react";
import { AssetSearchResults } from "../../../shared";

export const useTotalResults = (results: AssetSearchResults | null) => {
  const coinsLength = results?.coins?.length || 0;
  const categoriesLength = results?.categories?.length || 0;
  const exchangesLength = results?.exchanges?.length || 0;
  const icosLength = results?.icos?.length || 0;
  const nftsLength = results?.nfts?.length || 0;

  const total = useMemo(
    () => coinsLength + categoriesLength + exchangesLength + icosLength + nftsLength,
    [coinsLength, categoriesLength, exchangesLength, icosLength, nftsLength]
  );

  return { coinsLength, categoriesLength, exchangesLength, icosLength, nftsLength, total };
};
