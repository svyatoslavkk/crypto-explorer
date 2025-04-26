import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Column,
  Container,
  CopyButton,
  EthTx,
  formatFullDate,
  formatTimeAgo,
  H,
  HorDivider,
  P,
  ProgressBar,
  Row,
} from "../../../shared";
import "./TxTooltip.scss";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

export const TxTooltip = ({ tx }: { tx: EthTx }) => {
  const formattedDate = formatFullDate(+tx.timeStamp);

  const transactionFeeEth = (Number(tx.gasPrice) * Number(tx.gasUsed)) / 1e18;
  const gasUsagePercentage = tx.gas && tx.gasUsed ? Math.round((+tx.gasUsed / +tx.gas) * 100) : 0;

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
          {tx.isError === "0" && (
            <FontAwesomeIcon icon={faCheckCircle} className="tx-tooltip__headline__icon" />
          )}
        </Row>
        <P size="sm" color="secondary">
          {formattedDate}
        </P>
      </Column>
      <HorDivider />
      <Column gap={4}>
        <P color="secondary" size="sm">
          Transaction fee
        </P>
        <div className="tx-tooltip__fee-value">
          <P color="primary" size="sm">
            {transactionFeeEth.toFixed(6)} ETH
          </P>
          <P color="primary" size="sm">
            {" "}
          </P>
        </div>
      </Column>
      <HorDivider />
      <Column gap={4}>
        <P color="secondary" size="sm">
          Transaction hash
        </P>
        <Row gap={4}>
          <P color="primary" size="sm">
            {`${tx.hash.slice(0, 8)}...${tx.hash.slice(-8)}`}
          </P>
          <CopyButton size="sm" text={tx.hash} />
        </Row>
      </Column>
      <HorDivider />
      <Column gap={4}>
        <div className="tx-tooltip__block">
          <P color="secondary" size="sm">
            Block
          </P>
          <P color="primary" size="sm">
            {tx.blockNumber}
          </P>
        </div>
        <div className="tx-tooltip__age">
          <P color="secondary" size="sm">
            Age
          </P>
          <P color="primary" size="sm">
            {formatTimeAgo(+tx.timeStamp)}
          </P>
        </div>
      </Column>
      <HorDivider />
      <Column gap={4}>
        <div className="tx-tooltip__gas-price">
          <P color="secondary" size="sm">
            Gas price
          </P>
          <P color="primary" size="sm">
            {(+tx.gasPrice / 1e9).toFixed(2)} Gwei
          </P>
        </div>
        <div className="tx-tooltip__gas-usage">
          <P color="secondary" size="sm">
            Gas usage
          </P>
          <Row gap={8}>
            <ProgressBar percentage={gasUsagePercentage} width={100} height={6} />
            <P color="primary" size="sm">
              {gasUsagePercentage}%
            </P>
          </Row>
        </div>
      </Column>
    </Container>
  );
};

export default TxTooltip;
