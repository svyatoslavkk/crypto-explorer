import { useParams } from "react-router-dom";
import CoinDetails from "../../../widgets/coin_details/ui/CoinDetails";
import "./CoinPage.scss";
import { AssetSearchDropdownWrapper } from "../../../features";
import GasPriceTracker from "../../../widgets/gas_price_tracker/ui/GasPriceTracker";

const CoinPage = () => {
  const { coinId } = useParams();

  if (!coinId) return null;

  return (
    <div className="coin__page">
      <div className="coin__page__container">
        <CoinDetails coinId={coinId} />
        <AssetSearchDropdownWrapper />
        <GasPriceTracker />
      </div>
    </div>
  );
};

export default CoinPage;
