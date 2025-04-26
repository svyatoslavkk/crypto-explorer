import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Column, Container, CopyButton, H, P, Row } from "../../../shared";
import "./TxTooltip.scss";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

export const TxTooltip = () => {
  return (
    <Container className="tx-tooltip">
      <div className="tx-tooltip__header">
        <div className="tx-tooltip__header__icon">
          <FontAwesomeIcon icon={faEthereum} size="xl" />
        </div>
      </div>
      <Column gap={4}>
        <Row gap={8}>
          <H level={4}>Transaction details</H>
          <FontAwesomeIcon icon={faCheckCircle} className="tx-tooltip__headline__icon" />
        </Row>
        <P size="sm" color="secondary">
          Mar 07 2024 00:16:47 AM
        </P>
      </Column>
      <div className="tx-tooltip__divider" />
      <Column gap={4}>
        <P color="secondary" size="sm">
          Transaction fee
        </P>
        <div className="tx-tooltip__fee-value">
          <P color="primary" size="sm">
            0.0015684 ETH
          </P>
          <P color="primary" size="sm">
            {"($7.62)"}
          </P>
        </div>
      </Column>
      <div className="tx-tooltip__divider" />
      <Column gap={4}>
        <P color="secondary" size="sm">
          Transaction hash
        </P>
        <Row gap={4}>
          <P color="primary" size="sm">
            0x32029f61...4684b6df
          </P>
          <CopyButton size="sm" text="0x32029f61...4684b6df" />
        </Row>
      </Column>
      <div className="tx-tooltip__divider" />
      <Column gap={4}>
        <div className="tx-tooltip__block">
          <P color="secondary" size="sm">
            Block
          </P>
          <P color="primary" size="sm">
            16168186
          </P>
        </div>
        <div className="tx-tooltip__age">
          <P color="secondary" size="sm">
            Age
          </P>
          <P color="primary" size="sm">
            9m ago
          </P>
        </div>
      </Column>
      <div className="tx-tooltip__divider" />
      <Column gap={4}>
        <div className="tx-tooltip__gas-price">
          <P color="secondary" size="sm">
            Gas price
          </P>
          <P color="primary" size="sm">
            95.6691866
          </P>
        </div>
        <div className="tx-tooltip__gas-usage">
          <P color="secondary" size="sm">
            Gas usage
          </P>
          <Row gap={4}>
            <P color="primary" size="sm">
              82%
            </P>
          </Row>
        </div>
      </Column>
    </Container>
  );
};

export default TxTooltip;
