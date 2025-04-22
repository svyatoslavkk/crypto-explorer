export const formatAmount = (num: number): string => {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(3).replace(/\.?0+$/, "") + "T";
  }
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(3).replace(/\.?0+$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(3).replace(/\.?0+$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(3).replace(/\.?0+$/, "") + "K";
  }
  return num.toString();
};
