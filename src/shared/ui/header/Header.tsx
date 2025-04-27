import { AssetSearchDropdownWrapper } from "../../../features";
import { Button } from "../button";
import "./Header.scss";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__content__left"></div>
        <AssetSearchDropdownWrapper />
        <div className="header__content__right">
          <Button>Connect Wallet</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
