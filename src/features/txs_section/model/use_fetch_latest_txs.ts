import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { EthTx, isValidETHAddress } from "../../../shared";
import { useQuery } from "@tanstack/react-query";

interface EtherscanResponse {
  status: string;
  message: string;
  result: EthTx[];
}

const fetchLatestTxs = async ({
  address,
  offset = 8,
}: {
  address: string;
  offset?: number;
}): Promise<EtherscanResponse> => {
  const url = new URL(`http://localhost:5000/api/sepoliaTxs/${address}`);
  url.searchParams.append("page", "1");
  url.searchParams.append("offset", offset.toString());

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch latest transactions");
  return res.json();
};

export const useFetchLatestTxs = (offset = 8) => {
  const address = useSelector((state: RootState) => state.wallet.address);

  return useQuery<EtherscanResponse, Error>({
    queryKey: ["latest-transactions", address],
    queryFn: () => fetchLatestTxs({ address, offset }),
    enabled: !!address && isValidETHAddress(address),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });
};
