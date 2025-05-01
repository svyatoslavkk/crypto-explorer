import { useLatestBlocks } from "../../../widgets/latest_blocks/model/use_latest_blocks";
import LatestBlockItem from "../../../widgets/latest_blocks/ui/LatestBlockItem";
import "./Blocks.scss";

export const Blocks = () => {
  const { blocks } = useLatestBlocks();
  return (
    <div className="blocks">
      <ul className="blocks__list">
        {blocks.map((block, index) => (
          <div key={block.number} className="blocks__list__item">
            <LatestBlockItem block={block} index={index} blockLength={blocks.length} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Blocks;
