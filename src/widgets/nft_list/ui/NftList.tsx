import { useNftInfiniteScroll } from "../model/use_nft_infinite_scroll";
import { Column, H, P, Spinner } from "../../../shared";
import "./NftList.scss";

export const NftList = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const { nfts, loading, loaderRef } = useNftInfiniteScroll();

  return (
    <Column gap={16}>
      <ul className="nft-list">
        {nfts.length > 0 &&
          nfts.map(nft => (
            <li key={nft.id} className="nft-list__item" onClick={() => onSelect(nft.id)}>
              <H level={5}>{nft.name}</H>
              <P size="sm" color="secondary">
                {`${nft.contract_address?.slice(0, 8)}...${nft.contract_address?.slice(-8)}` || "0"}
              </P>
            </li>
          ))}
      </ul>
      {loading && <Spinner size="m" className="nft-list__loader" />}
      <div ref={loaderRef} style={{ height: 16 }} />
    </Column>
  );
};
