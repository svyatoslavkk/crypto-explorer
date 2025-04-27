import { useDispatch, useSelector } from "react-redux";
import { Button, Input } from "../../../shared";
import { RootState } from "../../../app/store";
import { clearWalletAddress, setWalletAddress } from "../model/slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./InputWallet.scss";

export const InputWallet = () => {
  const dispatch = useDispatch();
  const address = useSelector((state: RootState) => state.wallet.address);

  return (
    <div className="input-wallet">
      <Input
        placeholder="Paste wallet address"
        left={<FontAwesomeIcon icon={faWallet} style={{ width: 14, height: 14, marginLeft: 6 }} />}
        right={
          <Button
            size="md"
            className="input-wallet__button"
            onClick={() => dispatch(clearWalletAddress())}
          >
            <FontAwesomeIcon icon={faXmark} style={{ width: 14, height: 14 }} />
          </Button>
        }
        className="input-wallet__field"
        value={address}
        onChange={e => dispatch(setWalletAddress(e.target.value))}
      />
    </div>
  );
};
