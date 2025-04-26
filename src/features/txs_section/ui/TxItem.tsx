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
import {
  faArrowRightArrowLeft,
  faArrowTurnUp,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import "./TxItem.scss";
import { useEffect, useRef, useState } from "react";
import { TxTooltip } from "../../../widgets";

const TOOLTIP_WIDTH = 291;
const TOOLTIP_HEIGHT = 446;

const TxItem = ({ tx }: { tx: EthTx }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(
    null
  );

  const iconRef = useRef<HTMLDivElement>(null);

  const handleIconClick = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let top = rect.bottom + 8; // по умолчанию снизу
      let left = rect.left;

      // Проверка по вертикали
      if (windowHeight - rect.bottom < TOOLTIP_HEIGHT + 10) {
        // если внизу мало места — показать СВЕРХУ
        top = rect.top - TOOLTIP_HEIGHT - 8;
      }

      // Проверка по горизонтали
      if (windowWidth - rect.left < TOOLTIP_WIDTH) {
        // если справа мало места — сдвинуть влево
        left = rect.right - TOOLTIP_WIDTH;
      }

      setTooltipPosition({ top, left });
      setIsTooltipOpen(true);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (iconRef.current && !iconRef.current.contains(e.target as Node)) {
      setIsTooltipOpen(false);
    }
  };

  useEffect(() => {
    if (isTooltipOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isTooltipOpen]);

  return (
    <li className="tx-item">
      <Row gap={8}>
        <div
          ref={iconRef}
          className="tx-item__first__icon"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleIconClick}
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
          <TxTooltip />
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
