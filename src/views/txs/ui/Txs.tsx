import "./Txs.scss";
import { InputWallet, useInfiniteScroll } from "../../../features";
import { useFetchTransactions } from "../../../features/input_wallet/model/useFetchTransactions";
import TxItem from "../../../features/txs_section/ui/TxItem";
import { Spinner } from "../../../shared";

export const Txs = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useFetchTransactions();

  const { loaderRef } = useInfiniteScroll(fetchNextPage, hasNextPage, isFetchingNextPage);

  return (
    <>
      <InputWallet />
      <div className="txs-container">
        {isLoading && <Spinner size="m" />}
        {error && <p>Error loading transactions</p>}

        {data?.pages.map((page, i) => (
          <div key={i} className="txs-container__list">
            {page.result.map(tx => (
              <div key={tx.hash} className="txs-container__list__item">
                <TxItem tx={tx} />
              </div>
            ))}
          </div>
        ))}

        {!isLoading && (
          <div ref={loaderRef} className="loading-trigger">
            {isFetchingNextPage ? <Spinner size="m" /> : "Scroll to load more"}
          </div>
        )}
      </div>
    </>
  );
};

export default Txs;
