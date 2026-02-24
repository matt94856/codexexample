import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'
});

export async function fetchStockAnalysis(ticker) {
  const response = await api.get(`/market/analysis/${ticker}`);
  return response.data;
}
