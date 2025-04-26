import { useParams } from "react-router-dom";
import CoinDetails from "../../../widgets/coin_details/ui/CoinDetails";
import "./CoinPage.scss";
import { InputWallet } from "../../../features";
import GasPriceTracker from "../../../widgets/gas_price_tracker/ui/GasPriceTracker";
import TxsSection from "../../../features/txs_section/ui/TxsSection";
import { LatestBlocks, TxTooltip } from "../../../widgets";

const CoinPage = () => {
  const { coinId } = useParams();

  if (!coinId) return null;

  return (
    <div className="coin__page">
      <div className="coin__page__container">
        <CoinDetails coinId={coinId} />
        <InputWallet />
        <div style={{ display: "flex", alignItems: "stretch", gap: 16 }}>
          <LatestBlocks />
          <TxsSection />
        </div>
        <GasPriceTracker />
        <TxTooltip />
      </div>
    </div>
  );
};

export default CoinPage;
