import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { EthTx, isValidETHAddress } from "../../../shared";
import { useInfiniteQuery } from "@tanstack/react-query";

interface EtherscanResponse {
  status: string;
  message: string;
  result: EthTx[];
}

const fetchTransactions = async ({
  address,
  pageParam = 1,
  offset = 8,
}: {
  address: string;
  pageParam?: number;
  offset?: number;
}): Promise<EtherscanResponse> => {
  const url = new URL(`http://localhost:5000/api/sepoliaTxs/${address}`);
  url.searchParams.append("page", pageParam.toString());
  url.searchParams.append("offset", offset.toString());

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
};

export const useFetchTransactions = (offset = 8) => {
  const address = useSelector((state: RootState) => state.wallet.address);

  return useInfiniteQuery<EtherscanResponse, Error>({
    queryKey: ["transactions", address],
    queryFn: ({ pageParam }) =>
      fetchTransactions({
        address,
        pageParam: Number(pageParam),
        offset,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.result.length < offset) return undefined;
      return allPages.length + 1;
    },
    initialPageParam: 1,
    enabled: !!address && isValidETHAddress(address),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};
