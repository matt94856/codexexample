function calculateSMA(prices, period) {
  if (prices.length < period) return null;

  const window = prices.slice(0, period);
  const sum = window.reduce((acc, point) => acc + point.close, 0);
  return Number((sum / period).toFixed(2));
}

export function calculateMovingAverages(prices) {
  const sorted = [...prices].sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    ma50: calculateSMA(sorted, 50),
    ma200: calculateSMA(sorted, 200)
  };
}

export function calculateRSI(prices, period = 14) {
  if (!prices || prices.length <= period) return null;

  const sorted = [...prices].sort((a, b) => new Date(a.date) - new Date(b.date));
  const closes = sorted.map((point) => point.close);

  let gainSum = 0;
  let lossSum = 0;

  for (let i = 1; i <= period; i += 1) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) gainSum += diff;
    else lossSum += Math.abs(diff);
  }

  let averageGain = gainSum / period;
  let averageLoss = lossSum / period;

  for (let i = period + 1; i < closes.length; i += 1) {
    const diff = closes[i] - closes[i - 1];
    const gain = diff > 0 ? diff : 0;
    const loss = diff < 0 ? Math.abs(diff) : 0;

    averageGain = (averageGain * (period - 1) + gain) / period;
    averageLoss = (averageLoss * (period - 1) + loss) / period;
  }

  if (averageLoss === 0) return 100;
  const rs = averageGain / averageLoss;
  return Number((100 - 100 / (1 + rs)).toFixed(2));
}

export function calculateRevenueGrowth(annualReports = []) {
  if (annualReports.length < 2) return null;

  const [latest, previous] = annualReports;
  const latestRevenue = Number(latest.totalRevenue || 0);
  const previousRevenue = Number(previous.totalRevenue || 0);

  if (!latestRevenue || !previousRevenue) return null;
  const growth = ((latestRevenue - previousRevenue) / previousRevenue) * 100;
  return Number(growth.toFixed(2));
}
