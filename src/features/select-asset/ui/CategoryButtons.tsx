import { Dispatch, SetStateAction } from "react";
import { Button } from "../../../shared";
import { AssetCategory } from "../model/useAssetSearch";
import "./AssetSearchDropdown.scss";

const CategoryButtons = ({
  coinsLength,
  categoriesLength,
  exchangesLength,
  icosLength,
  nftsLength,
  activeCategory,
  setActiveCategory,
}: {
  coinsLength: number;
  categoriesLength: number;
  exchangesLength: number;
  icosLength: number;
  nftsLength: number;
  activeCategory: AssetCategory;
  setActiveCategory: Dispatch<SetStateAction<AssetCategory>>;
}) => {
  return (
    <div className="asset-search-dropdown__btns">
      {coinsLength > 0 && (
        <Button
          color={activeCategory === "coins" ? "primary" : "default"}
          onClick={() => setActiveCategory("coins")}
        >
          Tokens
        </Button>
      )}
      {nftsLength > 0 && (
        <Button
          color={activeCategory === "nfts" ? "primary" : "default"}
          onClick={() => setActiveCategory("nfts")}
        >
          NFTs
        </Button>
      )}
      {exchangesLength > 0 && (
        <Button
          color={activeCategory === "exchanges" ? "primary" : "default"}
          onClick={() => setActiveCategory("exchanges")}
        >
          Exchanges
        </Button>
      )}
      {categoriesLength > 0 && (
        <Button
          color={activeCategory === "categories" ? "primary" : "default"}
          onClick={() => setActiveCategory("categories")}
        >
          Categories
        </Button>
      )}
      {icosLength > 0 && (
        <Button
          color={activeCategory === "icos" ? "primary" : "default"}
          onClick={() => setActiveCategory("icos")}
        >
          ICOs
        </Button>
      )}
    </div>
  );
};

export default CategoryButtons;
