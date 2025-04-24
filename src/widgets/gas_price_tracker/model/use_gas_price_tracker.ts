import { useState } from "react";
import { SpeedType } from "./types";
import { useQuery } from "@tanstack/react-query";
import { fetchGasData } from "../api/fetch_gas_data";

export const useGasPriceTracker = () => {
  const [selectedSpeed, setSelectedSpeed] = useState<SpeedType>("Fast");

  const {
    data: gasData = { Rapid: 0, Fast: 0, Standard: 0, Suggest: 0 },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["gasData"],
    queryFn: fetchGasData,
    refetchInterval: 60_000,
  });

  const gwei = gasData[selectedSpeed] ?? 0;
  const usdEstimate = (gwei * 0.08).toFixed(2);
  const timeEstimate = gwei === 0 ? "∞" : (100 / gwei).toFixed(1);

  return {
    selectedSpeed,
    setSelectedSpeed,
    gwei,
    usdEstimate,
    timeEstimate,
    isLoading,
    isError,
  };
};
