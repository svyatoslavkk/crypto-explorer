import { useState } from "react";
import { Column } from "../../../shared";
import { NftList } from "../../../widgets";
import { NftDrawer } from "../../../features";

export const NFTs = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <Column gap={16}>
      <NftList onSelect={id => setSelectedId(id)} />
      <NftDrawer nftId={selectedId} onClose={() => setSelectedId(null)} />
    </Column>
  );
};

export default NFTs;
