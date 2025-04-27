import { useParams } from "react-router-dom";
import CoinDetails from "../../../widgets/coin_details/ui/CoinDetails";
import { Row } from "../../../shared";
import { LatestBlocks } from "../../../widgets";
import TxsSection from "../../../features/txs_section/ui/TxsSection";
import "./Dashboard.scss";
import GasPriceTracker from "../../../widgets/gas_price_tracker/ui/GasPriceTracker";
import { CoinLiveChart, InputWallet } from "../../../features";

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
