import { useParams } from "react-router-dom";
import CoinDetails from "../../../widgets/coin_details/ui/CoinDetails";
import "./CoinPage.scss";
import { LatestBlocks } from "../../../widgets";

const CoinPage = () => {
  const { coinId } = useParams();

  if (!coinId) return null;

  return (
    <div className="coin__page">
      <div className="coin__page__container">
        <CoinDetails coinId={coinId} />
        <LatestBlocks />
      </div>
    </div>
  );
};

export default CoinPage;
