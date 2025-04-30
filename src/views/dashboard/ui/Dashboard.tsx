import { useParams } from "react-router-dom";
import { Row } from "../../../shared";
import "./Dashboard.scss";
import { CoinLiveChart, InputWallet } from "../../../features";
import GasPriceTracker from "../../../widgets/gas_price_tracker/ui/GasPriceTracker";
import CoinDetails from "../../../widgets/coin_details/ui/CoinDetails";
import { LatestBlocks } from "../../../widgets";
import TxsSection from "../../../features/txs_section/ui/TxsSection";

const Dashboard = () => {
  const { coinId } = useParams();

  if (!coinId) return null;

  return (
    <>
      <Row gap={16}>
        <CoinDetails coinId={coinId} />
      </Row>
      <InputWallet />
      <Row gap={16} className="dashboard__wrap">
        <CoinLiveChart coinId={coinId} />
        <GasPriceTracker />
      </Row>
      <Row gap={16}>
        <LatestBlocks />
        <TxsSection />
      </Row>
    </>
  );
};

export default Dashboard;
