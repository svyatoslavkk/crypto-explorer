import React from "react";
import { P } from "../../../shared";
import "./AssetSearchDropdown.scss";

interface SearchSummaryProps {
  totalResults: number;
  elapsedTime: number;
}

const SearchSummary: React.FC<SearchSummaryProps> = ({ totalResults, elapsedTime }) => {
  return (
    <div className="asset-search-dropdown__found">
      <P size="sm" color="secondary">
        Found {totalResults} results ({elapsedTime} seconds)
      </P>
    </div>
  );
};

export default SearchSummary;
