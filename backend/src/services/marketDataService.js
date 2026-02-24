import axios from 'axios';
import { env } from '../config/env.js';
import { getOrSetCache } from '../cache/cacheClient.js';

function normalizeTimeSeries(timeSeries = {}) {
  return Object.entries(timeSeries).map(([date, values]) => ({
    date,
    open: Number(values['1. open']),
    high: Number(values['2. high']),
    low: Number(values['3. low']),
    close: Number(values['4. close']),
    volume: Number(values['5. volume'])
  }));
}

async function requestAlphaVantage(params) {
  const response = await axios.get(env.alphaVantageBaseUrl, {
    params: {
      apikey: env.alphaVantageApiKey,
      ...params
    },
    timeout: 10000
  });

  if (response.data.Note) {
    throw new Error('Alpha Vantage rate limit reached. Try again soon.');
  }

  if (response.data['Error Message']) {
    throw new Error('Invalid ticker symbol or unsupported data.');
  }

  return response.data;
}

export function getHistoricalData(symbol) {
  const cacheKey = `historical:${symbol}`;

  return getOrSetCache(cacheKey, async () => {
    const data = await requestAlphaVantage({
      function: 'TIME_SERIES_DAILY_ADJUSTED',
      symbol,
      outputsize: 'full'
    });

    return normalizeTimeSeries(data['Time Series (Daily)']);
  });
}

export function getCompanyOverview(symbol) {
  const cacheKey = `overview:${symbol}`;

  return getOrSetCache(cacheKey, async () => {
    const data = await requestAlphaVantage({ function: 'OVERVIEW', symbol });
    return data;
  });
}

export function getIncomeStatement(symbol) {
  const cacheKey = `income:${symbol}`;

  return getOrSetCache(cacheKey, async () => {
    const data = await requestAlphaVantage({ function: 'INCOME_STATEMENT', symbol });
    return data.annualReports || [];
  });
}
