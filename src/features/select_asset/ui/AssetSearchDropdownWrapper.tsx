import { useEffect, useRef, useState } from "react";
import { Input } from "../../../shared/ui";
import AssetSearchDropdown from "./AssetSearchDropdown";
import { useAssetSearch } from "../model/useAssetSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const AssetSearchDropdownWrapper = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const { results, loading, elapsedTime, activeCategory, setActiveCategory } =
    useAssetSearch(inputRef);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleInput = () => {
      setInputValue(input.value.trim());
    };

    input.addEventListener("input", handleInput);
    return () => input.removeEventListener("input", handleInput);
  }, []);

  return (
    <div className="asset-search">
      <Input
        left={<FontAwesomeIcon icon={faEthereum} style={{ marginLeft: 6 }} />}
        right={<FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginRight: 6 }} />}
        placeholder="Search assets..."
        ref={inputRef}
        maxWidth="650px"
      />
      {inputRef?.current?.value && results && (
        <AssetSearchDropdown
          inputRef={inputRef}
          results={results}
          loading={loading}
          elapsedTime={elapsedTime}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      )}
    </div>
  );
};
