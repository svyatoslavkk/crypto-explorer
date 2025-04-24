import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, H, P, Spinner } from "../../../shared";
import { faFire, faHourglassHalf, faRocket, faShoePrints } from "@fortawesome/free-solid-svg-icons";
import "./GasPriceTracker.scss";
import { useGasPriceTracker } from "../model/use_gas_price_tracker";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { SpeedType } from "../model/types";

const GasPriceTracker = () => {
  const { selectedSpeed, setSelectedSpeed, gwei, usdEstimate, timeEstimate, isLoading, isError } =
    useGasPriceTracker();

  const speeds: { label: SpeedType; icon: IconProp }[] = [
    { label: "Rapid", icon: faRocket },
    { label: "Fast", icon: faFire },
    { label: "Standard", icon: faShoePrints },
    { label: "Suggest", icon: faHourglassHalf },
  ];

  return (
    <Container className="gas-price-tracker">
      <div className="gas-price-tracker__info">
        <H level={4}>Gas Price Tracker</H>
        <div className="gas-price-tracker__info__value">
          <div className="gas-price-tracker__info__value__price">
            <H level={2}>${usdEstimate}</H>
            {isLoading && <Spinner size="s" />}
          </div>
          <P size="sm" color="secondary">
            ≈{gwei} Gwei per transaction / {timeEstimate}s
          </P>
        </div>
      </div>
      <div className="gas-price-tracker__btns">
        {speeds.map(({ label, icon }) => (
          <Button
            key={label}
            color={selectedSpeed === label ? "primary" : "default"}
            onClick={() => setSelectedSpeed(label)}
          >
            <div className="gas-price-tracker__btns__btn">
              <FontAwesomeIcon icon={icon} className="gas-price-tracker__btns__btn__icon" />
              <P size="sm">{label}</P>
            </div>
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default GasPriceTracker;
