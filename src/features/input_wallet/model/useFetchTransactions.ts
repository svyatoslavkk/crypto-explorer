import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { EthTx, isValidETHAddress } from "../../../shared";
import { useQuery } from "@tanstack/react-query";

interface EtherscanResponse {
  status: string;
  message: string;
  result: EthTx[];
}

const fetchTransactions = async (address: string): Promise<EtherscanResponse> => {
  const res = await fetch(`http://localhost:5000/api/sepoliaTxs/${address}`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return res.json();
};

export const useFetchTransactions = () => {
  const address = useSelector((state: RootState) => state.wallet.address);

  const { data, isLoading, error } = useQuery({
    queryKey: ["transactions", address],
    queryFn: () => fetchTransactions(address),
    enabled: !!address && isValidETHAddress(address),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error };
};
