import { Button, Container, H, Spinner } from "../../../shared";
import { useLatestBlocks } from "../model/use_latest_blocks";
import "./LatestBlocks.scss";
import LatestBlockItem from "./LatestBlockItem";

export const LatestBlocks = () => {
  const { blocks, isLoading } = useLatestBlocks(false);

  if (isLoading) <Spinner size="m" />;

  return (
    <Container className="latest-blocks">
      <div className="latest-blocks__header">
        <H level={4}>Latest blocks</H>
        <Button color="default"> View all</Button>
      </div>
      <ul className="latest-blocks__list">
        {blocks.map((block, index) => (
          <LatestBlockItem key={index} block={block} index={index} blockLength={blocks.length} />
        ))}
      </ul>
    </Container>
  );
};

export default LatestBlocks;
