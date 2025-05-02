import { useRef, useEffect } from "react";
import { H, P, Spinner } from "../../../shared";
import { useNFTs } from "../../../entities";

export const NftList = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const { nfts, loading, hasMore, nextPage } = useNFTs();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaderRef.current || loading) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore) {
        nextPage();
      }
    });

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading, hasMore]);

  return (
    <>
      <ul className="nfts__list">
        {nfts.length > 0 &&
          nfts.map(nft => (
            <li key={nft.id} className="nfts__list__item" onClick={() => onSelect(nft.id)}>
              <H level={5}>{nft.name}</H>
              <P size="sm" color="secondary">
                {`${nft.contract_address?.slice(0, 8)}...${nft.contract_address?.slice(-8)}` || "0"}
              </P>
            </li>
          ))}
      </ul>
      {loading && <Spinner size="m" />}
      <div ref={loaderRef} style={{ height: 16 }} />
    </>
  );
};
