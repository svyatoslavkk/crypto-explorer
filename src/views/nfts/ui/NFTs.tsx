import { useEffect, useRef, useState } from "react";
import { Chip, Column, CopyButton, Drawer, H, HorDivider, P, Row, Spinner } from "../../../shared";
import "./NFTs.scss";

type Nft = {
  id: string;
  name: string;
  symbol: string;
  contract_address: string;
  asset_platform_id: string;
};

type NftDetail = {
  name: string;
  description: string;
  contract_address: string;
  image: { small: string; small_2x: string };
  market_cap_rank: number;
  native_currency_symbol: string;
  native_currency: string;
  one_day_sales: number;
  floor_price: { native_currency: number };
  market_cap: { native_currency: number };
  total_supply: number;
};

export const NFTs = () => {
  const [nfts, setNfts] = useState<Nft[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nftDetail, setNftDetail] = useState<NftDetail | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchNFTs = async (pageNum: number) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          order: "market_cap_usd_desc",
          per_page: "100",
          page: String(pageNum),
        });

        const response = await fetch(`http://localhost:5000/api/nfts-list?${params.toString()}`);
        if (!response.ok) throw new Error("Error fetching NFT list");

        const data: Nft[] = await response.json();

        setNfts(prev => [...prev, ...data]);
        if (data.length < 100) setHasMore(false);
      } catch (error) {
        console.error("Error fetching NFT list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs(page);
  }, [page]);

  useEffect(() => {
    if (loading) return;
    if (!loaderRef.current) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });

    observer.current.observe(loaderRef.current);
  }, [loading, hasMore]);

  const openDrawerWithDetails = async (id: string) => {
    setDrawerOpen(true);

    try {
      const response = await fetch(`http://localhost:5000/api/nft-data/${id}`);
      if (!response.ok) throw new Error("Error fetching NFT details");

      const data: NftDetail = await response.json();
      setNftDetail(data);
    } catch (error) {
      console.error("Failed to fetch NFT detail:", error);
    }
  };

  console.log("nfts", nfts);

  return (
    <div className="nfts">
      <H level={2}>NFTs</H>
      <ul className="nfts__list">
        {nfts.length > 0 &&
          nfts.map(nft => (
            <li
              key={nft.id}
              className="nfts__list__item"
              onClick={() => openDrawerWithDetails(nft.id)}
            >
              <H level={5}>{nft.name}</H>
              <P size="sm" color="secondary">
                {`${nft.contract_address?.slice(0, 8)}...${nft.contract_address?.slice(-8)}` || "0"}
              </P>
            </li>
          ))}
      </ul>

      {loading && <Spinner size="m" />}

      <div ref={loaderRef} style={{ height: 16 }} />

      <Drawer
        isOpen={drawerOpen}
        overlayType="blur"
        onClose={() => setDrawerOpen(false)}
        title={nftDetail?.name}
      >
        {nftDetail ? (
          <div className="nfts__drawer">
            <Column gap={16} className="nfts__drawer__main">
              <img
                className="nfts__drawer__main__img"
                src={nftDetail.image?.small_2x}
                alt={nftDetail.name}
              />
              <Column>
                <Row gap={8}>
                  <H level={4}>{nftDetail?.name}</H>
                  <Chip label={`#${nftDetail.market_cap_rank}`} color="primary" />
                </Row>
                <P size="sm" color="primary">
                  Starts from{" "}
                  <strong>
                    {nftDetail.floor_price?.native_currency ?? 0} {nftDetail.native_currency_symbol}
                  </strong>
                </P>
              </Column>
            </Column>
            <div className="nfts__drawer__details">
              <H level={5}>Details</H>
              <HorDivider />
              <Row gap={16} className="nfts__drawer__details__param">
                <P color="secondary" size="sm">
                  Market cap
                </P>
                <P color="primary" size="sm">
                  {nftDetail.market_cap?.native_currency ?? "N/A"}
                </P>
              </Row>
              <HorDivider />
              <Row gap={16} className="nfts__drawer__details__param">
                <P color="secondary" size="sm">
                  Total supply
                </P>
                <P color="primary" size="sm">
                  {nftDetail.total_supply}
                </P>
              </Row>
              <HorDivider />
              <Row gap={16} className="nfts__drawer__details__param">
                <P color="secondary" size="sm">
                  Contract address
                </P>
                <Row gap={4}>
                  <P
                    color="primary"
                    size="sm"
                  >{`${nftDetail.contract_address.slice(0, 6)}...${nftDetail.contract_address.slice(-6)}`}</P>
                  <CopyButton size="sm" text={nftDetail.contract_address} />
                </Row>
              </Row>
              <HorDivider />
              <Row gap={16} className="nfts__drawer__details__param">
                <P color="secondary" size="sm">
                  Native currency
                </P>
                <P color="primary" size="sm">
                  {nftDetail.native_currency}
                </P>
              </Row>
              <HorDivider />
              <Row gap={16} className="nfts__drawer__details__param">
                <P color="secondary" size="sm">
                  1 day sales
                </P>
                <P color="primary" size="sm">
                  {nftDetail.one_day_sales}
                </P>
              </Row>
            </div>
          </div>
        ) : (
          <Spinner size="s" />
        )}
      </Drawer>
    </div>
  );
};

export default NFTs;
