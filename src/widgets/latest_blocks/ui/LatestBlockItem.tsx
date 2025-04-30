import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyButton, formatTimeAgo, H, P, Row } from "../../../shared";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { BlockInfo } from "../model/use_latest_blocks";

interface LatestBlockItemProps {
  block: BlockInfo;
  index: number;
  blockLength: number;
}

export const LatestBlockItem = ({ block, index, blockLength }: LatestBlockItemProps) => {
  return (
    <li className="latest-blocks__list__item">
      <div className="latest-blocks__list__item__icon">
        <FontAwesomeIcon icon={faCube} />
      </div>
      <div className="latest-blocks__list__item__info">
        <div className="latest-blocks__list__item__info__title">
          <H level={5}>{block.number}</H>
          <P size="sm" color="secondary">
            {formatTimeAgo(block.timestamp)}
          </P>
        </div>
        <Row gap={4}>
          <P size="sm" color="secondary">
            Transactions:
          </P>
          <P size="sm" color="primary">
            {block.transactions.length}
          </P>
        </Row>
        <Row gap={4}>
          <P size="sm" color="secondary">
            Hash:
          </P>
          <P size="sm" color="primary">
            {block.hash?.slice(0, 25)}...
          </P>
          <CopyButton size="sm" text={block?.hash || ""} />
        </Row>
        {index !== blockLength - 1 && <div className="latest-blocks__list__item__info__divider" />}
      </div>
    </li>
  );
};

export default LatestBlockItem;
