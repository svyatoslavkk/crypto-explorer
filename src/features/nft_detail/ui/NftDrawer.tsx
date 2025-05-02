import { Chip, Column, CopyButton, Drawer, H, HorDivider, P, Row, Spinner } from "../../../shared";
import { useNftDetails } from "../../../entities";
import "./NftDrawer.scss";

export const NftDrawer = ({ nftId, onClose }: { nftId: string | null; onClose: () => void }) => {
  const { data, loading } = useNftDetails(nftId);
  return (
    <Drawer isOpen={!!nftId} title={data?.name} onClose={onClose} overlayType="blur">
      {data ? (
        <Column gap={16} className="nft-drawer">
          <Column gap={16} className="nft-drawer__main">
            <img className="nft-drawer__main__img" src={data.image?.small_2x} alt={data.name} />
            <Column>
              <Row gap={8}>
                <H level={4}>{data?.name}</H>
                <Chip label={`#${data.market_cap_rank}`} color="primary" />
              </Row>
              <P size="sm" color="primary">
                Starts from{" "}
                <strong>
                  {data.floor_price?.native_currency ?? 0} {data.native_currency_symbol}
                </strong>
              </P>
            </Column>
          </Column>
          <div className="nft-drawer__details">
            <H level={5}>Details</H>
            <HorDivider />
            <Row gap={16} className="nft-drawer__details__param">
              <P color="secondary" size="sm">
                Market cap
              </P>
              <P color="primary" size="sm">
                {data.market_cap?.native_currency ?? "N/A"}
              </P>
            </Row>
            <HorDivider />
            <Row gap={16} className="nft-drawer__details__param">
              <P color="secondary" size="sm">
                Total supply
              </P>
              <P color="primary" size="sm">
                {data.total_supply}
              </P>
            </Row>
            <HorDivider />
            <Row gap={16} className="nft-drawer__details__param">
              <P color="secondary" size="sm">
                Contract address
              </P>
              <Row gap={4}>
                <P
                  color="primary"
                  size="sm"
                >{`${data?.contract_address?.slice(0, 6)}...${data?.contract_address?.slice(-6)}`}</P>
                <CopyButton size="sm" text={data.contract_address} />
              </Row>
            </Row>
            <HorDivider />
            <Row gap={16} className="nft-drawer__details__param">
              <P color="secondary" size="sm">
                Native currency
              </P>
              <P color="primary" size="sm">
                {data.native_currency}
              </P>
            </Row>
            <HorDivider />
            <Row gap={16} className="nft-drawer__details__param">
              <P color="secondary" size="sm">
                1 day sales
              </P>
              <P color="primary" size="sm">
                {data.one_day_sales}
              </P>
            </Row>
          </div>
        </Column>
      ) : (
        <Spinner size="s" />
      )}
    </Drawer>
  );
};
