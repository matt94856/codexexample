export function generateSentimentSummary({ symbol, latestPrice, ma50, ma200, rsi, revenueGrowth }) {
  const signals = [];

  if (ma50 && ma200) {
    signals.push(ma50 > ma200 ? 'short-term momentum is above long-term trend' : 'short-term momentum is below long-term trend');
  }

  if (rsi) {
    if (rsi > 70) signals.push('the stock appears overbought based on RSI');
    else if (rsi < 30) signals.push('the stock appears oversold based on RSI');
    else signals.push('RSI suggests neutral momentum');
  }

  if (typeof revenueGrowth === 'number') {
    signals.push(revenueGrowth >= 0 ? `revenue is growing by ${revenueGrowth}% year-over-year` : `revenue is contracting by ${Math.abs(revenueGrowth)}% year-over-year`);
  }

  if (!signals.length) {
    return `${symbol} has limited data available right now; sentiment appears neutral until more metrics are available.`;
  }

  return `${symbol} last traded near $${latestPrice}. Overall sentiment is mixed: ${signals.join(', ')}.`;
}
