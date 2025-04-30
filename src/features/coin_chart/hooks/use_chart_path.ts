export const useChartPath = (
  prices: { price: number; date: string | Date }[],
  width: number,
  height: number,
  getHeight: Function
) => {
  const paddingY = 0;
  const contentHeight = height - paddingY * 2;
  const gap = width / (prices.length - 1);

  const points = prices.map((p, i) => {
    const x = i * gap;
    const y = paddingY + (contentHeight - (getHeight(p.price) / 100) * contentHeight);
    return [x, y];
  });

  function getSmoothPath(points: number[][]) {
    if (points.length < 2) return "";

    const d = points.reduce((acc, point, i, arr) => {
      if (i === 0) return `M ${point[0]},${point[1]}`;
      const [prevX, prevY] = arr[i - 1];
      const [x, y] = point;
      const midX = (prevX + x) / 2;
      const midY = (prevY + y) / 2;
      return `${acc} Q ${prevX},${prevY} ${midX},${midY}`;
    }, "");

    const [lastX, lastY] = points[points.length - 1];
    return `${d} T ${lastX},${lastY}`;
  }

  const linePath = getSmoothPath(points);

  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  return { linePath, areaPath };
};
