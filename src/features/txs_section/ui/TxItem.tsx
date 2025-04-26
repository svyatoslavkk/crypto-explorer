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
  useTooltipPosition,
} from "../../../shared";
import {
  faArrowRightArrowLeft,
  faArrowTurnUp,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import "./TxItem.scss";
import { useRef, useState } from "react";
import { TxTooltip } from "../../../widgets";

const TOOLTIP_WIDTH = 293;
const TOOLTIP_HEIGHT = 446;

const TxItem = ({ tx }: { tx: EthTx }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const iconRef = useRef<HTMLDivElement>(null);

  const {
    isOpen: isTooltipOpen,
    openTooltip,
    position: tooltipPosition,
    tooltipRef,
  } = useTooltipPosition(iconRef, { width: TOOLTIP_WIDTH, height: TOOLTIP_HEIGHT });

  return (
    <li className="tx-item">
      <Row gap={8}>
        <div
          ref={iconRef}
          className="tx-item__first__icon"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={openTooltip}
        >
          <FontAwesomeIcon icon={isHovered ? faCircleInfo : faArrowRightArrowLeft} />
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

      {isTooltipOpen && tooltipPosition && (
        <div
          ref={tooltipRef}
          className="tx-tooltip-wrapper"
          style={{
            position: "fixed",
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            width: TOOLTIP_WIDTH,
            height: TOOLTIP_HEIGHT,
            zIndex: 1000,
          }}
        >
          <TxTooltip tx={tx} />
        </div>
      )}
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
