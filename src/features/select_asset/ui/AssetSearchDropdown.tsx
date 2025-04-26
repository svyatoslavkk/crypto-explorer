import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DropdownResults from "./DropdownResults";
import KeyboardControls from "./KeyboardControls";
import "./AssetSearchDropdown.scss";
import CategoryButtons from "./CategoryButtons";
import SearchSummary from "./SearchSummary";
import { useKeyboardNavigation } from "../model/useKeyboardNavigation";
import { useScrollToActiveItem } from "../model/useScrollToActiveItem";
import { useTotalResults } from "../model/useTotalResults";
import { AssetSearchResults } from "../../../shared";
import { AssetCategory } from "../model/useAssetSearch";

interface AssetSearchDropdownProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  results: AssetSearchResults | null;
  loading: boolean;
  elapsedTime: number;
  activeCategory: AssetCategory;
  setActiveCategory: Dispatch<SetStateAction<AssetCategory>>;
}

const AssetSearchDropdown: React.FC<AssetSearchDropdownProps> = ({
  inputRef,
  results,
  loading,
  elapsedTime,
  activeCategory,
  setActiveCategory,
}) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const items = results?.[activeCategory] || [];

  const handleEnterClick = () => {
    if (items[activeIndex]?.id) {
      navigate(`/${items[activeIndex].id}`);
    }
  };

  useKeyboardNavigation({
    items,
    inputRef,
    setActiveIndex,
    onEnter: handleEnterClick,
  });

  useScrollToActiveItem(itemRefs, resultsRef, activeIndex);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  const {
    coinsLength,
    categoriesLength,
    exchangesLength,
    icosLength,
    nftsLength,
    total: totalResults,
  } = useTotalResults(results);

  return (
    <div className="asset-search-dropdown">
      <SearchSummary totalResults={totalResults} elapsedTime={elapsedTime} />
      <div className="asset-search-dropdown__divider" />
      <CategoryButtons
        coinsLength={coinsLength}
        categoriesLength={categoriesLength}
        exchangesLength={exchangesLength}
        icosLength={icosLength}
        nftsLength={nftsLength}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="asset-search-dropdown__divider" />
      <DropdownResults
        items={items}
        activeIndex={activeIndex}
        resultsRef={resultsRef}
        itemRefs={itemRefs}
      />
      <div className="asset-search-dropdown__divider" />
      <KeyboardControls
        items={items}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        inputRef={inputRef}
      />
    </div>
  );
};

export default AssetSearchDropdown;
