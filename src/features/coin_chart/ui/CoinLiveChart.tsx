import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Button, Chip, Column, Container, H, P, Row, useTokenPriceLive } from "../../../shared";
import { useCoinDetails } from "../../../widgets/coin_details/model/use_coin_details";
import { useLivePriceTracker } from "../model/use_live_price_tracker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CoinLiveChart.scss";
import { useChartPath } from "../hooks/use_chart_path";

export const CoinLiveChart = ({ coinId }: { coinId: string }) => {
  const {
    prices,
    days,
    setDays,
    loading,
    error: pricesError,
    getHeight,
    formatDate,
  } = useLivePriceTracker(coinId);
  const { coinData, error, loading: coinDetailsLoading } = useCoinDetails(coinId);
  const price = useTokenPriceLive(coinData?.symbol);
  if (loading) return <div>Загрузка...</div>;
  if (pricesError) return <div>{error}</div>;
  if (!coinData) return null;

  const width = 664;
  const height = 96;
  const { linePath, areaPath } = useChartPath(prices, width, height, getHeight);

  return (
    <Container color="default" className="coin-live-chart">
      <div className="coin-live-chart__cur">
        <Column gap={8} className="coin-live-chart__cur__left">
          <P size="base">Price history</P>
          <Row gap={8}>
            <H level={2}>${price ?? coinData.market_data.current_price.usd.toFixed(2)}</H>
            <Chip
              icon={
                coinData?.market_data.price_change_percentage_24h > 0 ? (
                  <FontAwesomeIcon icon={faCaretUp} size="sm" />
                ) : (
                  <FontAwesomeIcon icon={faCaretDown} size="sm" />
                )
              }
              label={`${coinData?.market_data.price_change_percentage_30d.toFixed(2) || "0.00"}%`}
            />
          </Row>
        </Column>
        <Row gap={8}>
          <Button
            color={days === 7 ? "primary" : "default"}
            variant="filled"
            disabled
            onClick={() => setDays(7)}
          >
            7D
          </Button>
          <Button
            color={days === 14 ? "primary" : "default"}
            variant="filled"
            disabled
            onClick={() => setDays(14)}
          >
            14D
          </Button>
          <Button
            color={days === 30 ? "primary" : "default"}
            variant="filled"
            disabled
            onClick={() => setDays(30)}
          >
            30D
          </Button>
        </Row>
      </div>
      <div style={{ width: "100%" }}>
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="orange-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="orange" stopOpacity="0.25" />
              <stop offset="100%" stopColor="orange" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={areaPath}
            fill="url(#orange-gradient)"
            style={{
              filter: "drop-shadow(0px 0px 5px orange)",
            }}
          />
          <path
            d={linePath}
            fill="none"
            stroke="orange"
            strokeWidth="5"
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0px 0px 5px orange)",
            }}
          />
        </svg>
      </div>
      <div className="coin-live-chart__bars">
        {prices.map(({ price, date }, idx) => (
          <div key={idx} className="coin-live-chart__bars__item" title={`$${price.toFixed(2)}`}>
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
