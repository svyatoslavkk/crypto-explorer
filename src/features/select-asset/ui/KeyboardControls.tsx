import React, { Dispatch, SetStateAction } from "react";
import { AssetSearchResultItem, Button, P } from "../../../shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowTurnDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./AssetSearchDropdown.scss";

const KeyboardControls = ({
  items,
  activeIndex,
  setActiveIndex,
  inputRef,
}: {
  items: AssetSearchResultItem[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) => {
  const navigate = useNavigate();
  const handleEnterClick = () => {
    if (items[activeIndex]?.id) {
      navigate(`/${items[activeIndex].id}`);
    }
  };

  return (
    <div className="asset-search-dropdown__keys">
      <div className="asset-search-dropdown__keys__nav">
        <Button
          variant="outlined"
          color="default"
          onClick={() => setActiveIndex((prev: number) => (prev - 1 + items.length) % items.length)}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
        <Button
          variant="outlined"
          color="default"
          onClick={() => setActiveIndex((prev: number) => (prev + 1) % items.length)}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </Button>
        <P size="sm" color="secondary">
          To Navigate
        </P>
      </div>
      <div className="asset-search-dropdown__keys__esc">
        <Button
          variant="outlined"
          color="default"
          onClick={() => {
            if (inputRef.current) {
              inputRef.current.value = "";
              inputRef.current.focus();
            }
          }}
        >
          <P color="secondary" size="sm">
            ESC
          </P>
        </Button>
        <P size="sm" color="secondary">
          To Close
        </P>
      </div>
      <div className="asset-search-dropdown__keys__enter">
        <Button variant="outlined" color="default" onClick={handleEnterClick}>
          <P color="secondary" size="sm">
            <FontAwesomeIcon
              icon={faArrowTurnDown}
              className="asset-search-dropdown__keys__enter__icon"
            />
          </P>
        </Button>
        <P size="sm" color="secondary">
          To Enter
        </P>
      </div>
    </div>
  );
};

export default KeyboardControls;
