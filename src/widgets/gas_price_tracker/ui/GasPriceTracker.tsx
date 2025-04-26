import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Container, H, P, Spinner } from "../../../shared";
import { faFire, faHourglassHalf, faRocket, faShoePrints } from "@fortawesome/free-solid-svg-icons";
import "./GasPriceTracker.scss";
import { useGasPriceTracker } from "../model/use_gas_price_tracker";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { SpeedType } from "../model/types";
import Row from "../../../shared/ui/row";
import Column from "../../../shared/ui/column";

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
      <Column gap={16} className="gas-price-tracker__info">
        <H level={4}>Gas Price Tracker</H>
        <Column gap={4}>
          <Row>
            <H level={2}>${usdEstimate}</H>
            {isLoading && <Spinner size="s" />}
          </Row>
          <P size="sm" color="secondary">
            ≈{gwei} Gwei per transaction / {timeEstimate}s
          </P>
        </Column>
      </Column>
      <Column gap={4}>
        {speeds.map(({ label, icon }) => (
          <Button
            key={label}
            color={selectedSpeed === label ? "primary" : "default"}
            onClick={() => setSelectedSpeed(label)}
            className="gas-price-tracker__btns__button"
          >
            <Row>
              <FontAwesomeIcon icon={icon} className="gas-price-tracker__btns__btn__icon" />
              <P size="sm">{label}</P>
            </Row>
          </Button>
        ))}
      </Column>
    </Container>
  );
};

export default GasPriceTracker;
