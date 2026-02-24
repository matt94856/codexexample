import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || 4000,
  alphaVantageApiKey: process.env.ALPHA_VANTAGE_API_KEY || '',
  alphaVantageBaseUrl: process.env.ALPHA_VANTAGE_BASE_URL || 'https://www.alphavantage.co/query',
  cacheTtlSeconds: Number(process.env.CACHE_TTL_SECONDS || 300)
};

export function validateEnv() {
  if (!env.alphaVantageApiKey) {
    // Startup warning to keep local development functional with mock fallback behavior.
    console.warn('ALPHA_VANTAGE_API_KEY missing. API requests may fail without a valid key.');
  }
}
