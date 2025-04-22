import { Chip, formatAmount, H, P, StatItem } from "../../../shared";
import { useCoinDetails } from "../model/use_coin_details";
import "./CoinDetails.scss";

interface CoinDetailsProps {
  coinId: string;
}

const CoinDetails = ({ coinId }: CoinDetailsProps) => {
  const { coinData, error, loading } = useCoinDetails(coinId);

  if (!coinData) return null;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <section className="coin__details">
      <div className="coin__details__main">
        <div className="coin__details__main__avatar">
          <img src={coinData.image.large} alt={`${coinData.name}'s image`} />
        </div>
        <div className="coin__details__main__text">
          <P color="secondary" size="sm">
            Explores
          </P>
          <div className="coin__details__main__text__coin-name">
            <H level={4}>{coinData.name}</H>
            <Chip color="primary" label={`#${coinData.market_cap_rank}`} />
          </div>
        </div>
      </div>
      <StatItem
        label="24h change"
        value={`${coinData.market_data.price_change_percentage_24h.toFixed(2)}%`}
      />
      <StatItem label="All time high" value={`$${coinData.market_data.ath.usd}`} />
      <StatItem
        label="Market cap"
        value={`$${formatAmount(coinData.market_data.market_cap.usd)}`}
      />
      <StatItem
        label="FDV"
        value={`$${formatAmount(coinData.market_data.fully_diluted_valuation.usd)}`}
      />
    </section>
  );
};

export default CoinDetails;
