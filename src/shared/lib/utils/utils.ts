export const shortAddress = (addr: string) =>
  addr ? `${addr.slice(0, 6)}...${addr.slice(-6)}` : "";

export const formatEtherValue = (wei: string) => {
  return (+wei / 1e18).toFixed(5);
};
