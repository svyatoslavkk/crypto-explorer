import { Column, CopyButton, P, Row, Spinner } from "../../../shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { useNFTsB } from "../../../entities";
import "./NftList.scss";

export const NftList = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const { nfts, loading } = useNFTsB();

  if (loading) return <Spinner size="m" />;

  return (
    <ul className="nft-list">
      {nfts.map(nft => (
        <li
          key={nft.collection_title}
          className="nft-list__item"
          onClick={() => onSelect(nft.collection_address)}
        >
          <div className="nft-list__item__rank">{nft.rank}</div>
          <img
            className="nft-list__item__img"
            src={nft.collection_image}
            alt={`${nft.collection_title}'s image`}
          />
          <Column gap={8} className="nft-list__item__info">
            <Column gap={4}>
              <P size="sm">{nft.collection_title}</P>
              <Row gap={4}>
                <P
                  size="xs"
                  color="secondary"
                >{`${nft.collection_address.slice(0, 6)}...${nft.collection_address.slice(-6)}`}</P>
                <CopyButton text={nft.collection_address} size="sm" />
              </Row>
            </Column>
            <Row gap={8}>
              <FontAwesomeIcon icon={faEthereum} size="sm" />
              <P size="xs">{nft.floor_price} ETH</P>
            </Row>
          </Column>
        </li>
      ))}
    </ul>
  );
};
