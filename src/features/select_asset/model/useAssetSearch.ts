import { useEffect, useState } from "react";
import { fromEvent, debounceTime, distinctUntilChanged, map, switchMap, lastValueFrom } from "rxjs";
import { ajax } from "rxjs/ajax";
import { AssetSearchResults } from "../../../shared";

export type AssetCategory = keyof AssetSearchResults;

export const useAssetSearch = (inputRef: React.RefObject<HTMLInputElement | null>) => {
  const [results, setResults] = useState<AssetSearchResults | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<AssetCategory>("coins");

  useEffect(() => {
    if (!inputRef.current) return;

    const sub = fromEvent(inputRef.current, "input")
      .pipe(
        map(e => (e.target as HTMLInputElement).value.trim()),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(query => {
          if (!query) {
            setElapsedTime(0);
            return Promise.resolve(null);
          }

          setLoading(true);
          const start = performance.now();

          return lastValueFrom(
            ajax.getJSON<AssetSearchResults>(
              `${process.env.COIN_GECKO_API_URL}/search?query=${query}`
            )
          ).then(data => {
            const end = performance.now();
            const elapsedTime = (end - start) / 1000;
            setElapsedTime(+elapsedTime.toFixed(3));
            return data;
          });
        })
      )
      .subscribe(res => {
        setResults(res);
        setLoading(false);
      });

    return () => sub.unsubscribe();
  }, [inputRef]);

  return { results, loading, elapsedTime, activeCategory, setActiveCategory };
};
