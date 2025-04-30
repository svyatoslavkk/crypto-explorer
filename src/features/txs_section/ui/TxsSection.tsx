import { Button, Container, EthTx, H, Spinner } from "../../../shared";
import "./TxsSection.scss";
import { useFetchTransactions } from "../../input_wallet/model/useFetchTransactions";
import TxItem from "./TxItem";

const TxsSection = () => {
  const { data, isLoading, error } = useFetchTransactions();

  const txs: EthTx[] | undefined = data?.pages.flatMap(page => page.result);
  if (!data) return null;

  return (
    <Container className="txs-section">
      <div className="txs-section__header">
        <H level={4}>Latest transactions</H>
        <Button color="default">View all</Button>
      </div>
      <ul className="txs-section__list">
        {isLoading ? <Spinner size="m" /> : txs && txs.map(tx => <TxItem key={tx.hash} tx={tx} />)}
      </ul>
    </Container>
  );
};

export default TxsSection;
