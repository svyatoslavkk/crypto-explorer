import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { AssetSearchResultItem, StatItem } from "../../../shared";
import { useNavigate } from "react-router-dom";
import "./AssetSearchDropdown.scss";

interface DropdownResultsProps {
  items: AssetSearchResultItem[];
  activeIndex: number;
  resultsRef: React.RefObject<HTMLDivElement | null>;
  itemRefs: React.RefObject<(HTMLDivElement | null)[]>;
}

const DropdownResults: React.FC<DropdownResultsProps> = ({
  items,
  activeIndex,
  resultsRef,
  itemRefs,
}) => {
  const navigate = useNavigate();

  return (
    <div className="asset-search-dropdown__results" ref={resultsRef}>
      {items.map((item: any, index: number) => (
        <div
          key={index}
          ref={el => {
            itemRefs.current[index] = el;
          }}
          className={`asset-search-dropdown__results__item ${
            index === activeIndex ? "active" : ""
          }`}
          onClick={() => {
            if (items[activeIndex]?.id) {
              navigate(`/${items[activeIndex].id}`);
            }
          }}
        >
          <div className="asset-search-dropdown__results__item__left">
            <img
              src={
                item.large ||
                item.thumb ||
                `https://s2.coinmarketcap.com/static/img/coins/200x200/19214.png`
              }
              className="asset-search-dropdown__results__item__left__img"
              alt={`Token's image`}
            />
            <StatItem
              headlineFirst
              label="0x81f8f0bb1cb2a06649e51913a151f0e7ef6fa321"
              value={item.name}
            />
          </div>
          <div className="asset-search-dropdown__results__item__right">
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DropdownResults;
