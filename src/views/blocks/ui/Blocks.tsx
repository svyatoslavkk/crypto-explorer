import { useLatestBlocks } from "../../../widgets/latest_blocks/model/use_latest_blocks";
import LatestBlockItem from "../../../widgets/latest_blocks/ui/LatestBlockItem";
import "./Blocks.scss";
import { useInfiniteScroll } from "../../../widgets/latest_blocks/lib/use_infinite_scroll";
import { Spinner } from "../../../shared";

export const Blocks = () => {
  const { blocks, fetchOlderBlocks, isLoading, hasMore } = useLatestBlocks();
  const loaderRef = useInfiniteScroll({
    callback: fetchOlderBlocks,
    hasMore,
    threshold: 1,
  });

  return (
    <div className="blocks">
      <ul className="blocks__list">
        {blocks.map((block, index) => (
          <div key={block.number} className="blocks__list__item">
            <LatestBlockItem block={block} index={index} blockLength={blocks.length} />
          </div>
        ))}
      </ul>
      {isLoading && (
        <div className="blocks__loader">
          <Spinner size="m" />
        </div>
      )}
      {!hasMore && <div className="end">There is all blocks</div>}
      <div ref={loaderRef} style={{ height: "40px" }} />
    </div>
  );
};

export default Blocks;
