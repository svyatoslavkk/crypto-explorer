import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Button, Chip, Container, H, P } from "../../../shared";
import { useCoinDetails } from "../../../widgets/coin_details/model/use_coin_details";
import { useLivePriceTracker } from "../model/use_live_price_tracker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CoinLiveChart.scss";

export const CoinLiveChart = ({ coinId }: { coinId: string }) => {
  const { prices, days, setDays, loading, getHeight, formatDate } = useLivePriceTracker(coinId);
  const { coinData, error, loading: coinDetailsLoading } = useCoinDetails(coinId);
  if (loading) return <div>Загрузка...</div>;
  if (!coinData) return null;

  return (
    <Container color="default" className="coin-live-chart">
      <div className="coin-live-chart__cur">
        <div className="coin-live-chart__cur__left">
          <P size="base">Price history</P>
          <div className="coin-live-chart__cur__left__price">
            <H level={2}>${coinData.market_data.current_price.usd.toFixed(2)}</H>
            <Chip
              icon={
                coinData?.market_data.price_change_percentage_24h > 0 ? (
                  <FontAwesomeIcon icon={faCaretUp} size="sm" />
                ) : (
                  <FontAwesomeIcon icon={faCaretDown} size="sm" />
                )
              }
              label={`${coinData?.market_data.price_change_percentage_24h.toFixed(2) || "0.00"}%`}
            />
          </div>
        </div>
        <div className="coin-live-chart__cur__btns">
          <Button
            color={days === 7 ? "primary" : "default"}
            variant="filled"
            onClick={() => setDays(7)}
          >
            7D
          </Button>
          <Button
            color={days === 14 ? "primary" : "default"}
            variant="filled"
            onClick={() => setDays(14)}
          >
            14D
          </Button>
          <Button
            color={days === 30 ? "primary" : "default"}
            variant="filled"
            onClick={() => setDays(30)}
          >
            30D
          </Button>
        </div>
      </div>
      <div className="coin-live-chart__bars">
        {prices.map(({ price, date }, idx) => (
          <div key={idx} className="coin-live-chart__bars__item" title={`$${price.toFixed(2)}`}>
            <div
              className="coin-live-chart__bars__item__bar"
              style={{ height: `${getHeight(price)}%` }}
            />
            <P color="secondary" size="xs" className="coin-live-chart__bars__item__label">
              {formatDate(date)}
            </P>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default CoinLiveChart;
