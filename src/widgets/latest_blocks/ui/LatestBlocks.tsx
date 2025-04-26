import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, CopyButton, formatTimeAgo, H, P, Row } from "../../../shared";
import { useLatestBlocks } from "../model/use_latest_blocks";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import "./LatestBlocks.scss";

export const LatestBlocks = () => {
  const { blocks } = useLatestBlocks();
  return (
    <Container className="latest-blocks">
      <div className="latest-blocks__header">
        <H level={4}>Latest blocks</H>
        <Button color="default"> View all</Button>
      </div>
      <ul className="latest-blocks__list">
        {blocks.map((block, index) => (
          <li key={block.number} className="latest-blocks__list__item">
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
              {index !== blocks.length - 1 && (
                <div className="latest-blocks__list__item__info__divider" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default LatestBlocks;
