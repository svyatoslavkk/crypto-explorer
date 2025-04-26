import { useParams } from "react-router-dom";
import CoinDetails from "../../../widgets/coin_details/ui/CoinDetails";
import "./CoinPage.scss";
import { InputWallet } from "../../../features";
import TxsSection from "../../../features/txs_section/ui/TxsSection";
import { LatestBlocks } from "../../../widgets";
import GasPriceTracker from "../../../widgets/gas_price_tracker/ui/GasPriceTracker";

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
      </div>
    </div>
  );
};

export default CoinPage;
