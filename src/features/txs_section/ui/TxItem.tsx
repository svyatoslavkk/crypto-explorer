import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Chip,
  Column,
  CopyButton,
  EthTx,
  formatEtherValue,
  formatTimeAgo,
  P,
  Row,
  shortAddress,
} from "../../../shared";
import { faArrowRightArrowLeft, faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import "./TxItem.scss";

const TxItem = ({ tx }: { tx: EthTx }) => {
  return (
    <li className="tx-item">
      <Row gap={8}>
        <div className="tx-item__first__icon">
          <FontAwesomeIcon icon={faArrowRightArrowLeft} />
        </div>
        <Column gap={0}>
          <Row gap={4}>
            <P color="primary" size="sm">
              {shortAddress(tx.hash)}
            </P>
            <CopyButton size="sm" text={tx.hash} />
          </Row>
          <P color="secondary" size="xs">
            {formatTimeAgo(+tx.timeStamp)}
          </P>
        </Column>
      </Row>
      <div className="tx-item__second">
        <Row gap={4}>
          <P size="sm">{shortAddress(tx.from)}</P>
          <CopyButton size="sm" text={tx.from} />
        </Row>
        <Row gap={4}>
          <FontAwesomeIcon icon={faArrowTurnUp} className="tx-item__second__to__icon" />
          <P size="sm">{shortAddress(tx.to)}</P>
          <CopyButton size="sm" text={tx.to} />
        </Row>
      </div>
      <div className="tx-item__third">
        <Chip color="success" label={tx.isError === "0" ? "Confirmed" : "Failed"} />
      </div>
      <Row gap={4}>
        <P size="sm" color="primary">
          {formatEtherValue(tx.value)}
        </P>
        <FontAwesomeIcon icon={faEthereum} />
      </Row>
    </li>
  );
};

export default TxItem;
