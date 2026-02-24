import { calculateMovingAverages, calculateRSI, calculateRevenueGrowth } from '../utils/indicators.js';
import { generateSentimentSummary } from '../services/sentimentService.js';
import { getHistoricalData, getCompanyOverview, getIncomeStatement } from '../services/marketDataService.js';

export async function getStockAnalysis(req, res, next) {
  try {
    const symbol = String(req.params.symbol || '').toUpperCase().trim();
    if (!symbol) return res.status(400).json({ error: 'Ticker symbol is required.' });

    const [historicalPrices, overview, annualReports] = await Promise.all([
      getHistoricalData(symbol),
      getCompanyOverview(symbol),
      getIncomeStatement(symbol)
    ]);

    if (!historicalPrices?.length) {
      return res.status(404).json({ error: 'No historical data found for ticker.' });
    }

    const latestPrice = historicalPrices[0].close;
    const { ma50, ma200 } = calculateMovingAverages(historicalPrices);
    const rsi = calculateRSI(historicalPrices);
    const revenueGrowth = calculateRevenueGrowth(annualReports);

    const sentiment = generateSentimentSummary({
      symbol,
      latestPrice,
      ma50,
      ma200,
      rsi,
      revenueGrowth
    });

    res.json({
      symbol,
      companyName: overview?.Name || symbol,
      latestPrice,
      metrics: { ma50, ma200, rsi, revenueGrowth },
      sentiment,
      historicalPrices: historicalPrices.slice(0, 365)
    });
  } catch (error) {
    next(error);
  }
}
