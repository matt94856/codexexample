import { useState } from 'react';
import { fetchStockAnalysis } from './api/marketApi';
import StockChart from './components/StockChart';
import MetricsCards from './components/MetricsCards';
import { useDarkMode } from './hooks/useDarkMode';

export default function App() {
  const [ticker, setTicker] = useState('AAPL');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isDark, toggleDarkMode } = useDarkMode();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const analysis = await fetchStockAnalysis(ticker);
      setData(analysis);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch stock analysis.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">MarketLens</h1>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="rounded-md border px-3 py-2 text-sm"
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Enter ticker e.g. MSFT"
            className="w-full rounded-md border p-2 text-slate-900"
            required
          />
          <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white" disabled={loading}>
            {loading ? 'Loading...' : 'Analyze'}
          </button>
        </form>

        {error && <p className="rounded-md bg-red-100 p-3 text-red-700">{error}</p>}

        {data && (
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">{data.companyName} ({data.symbol})</h2>
            <MetricsCards latestPrice={data.latestPrice} metrics={data.metrics} />
            <StockChart data={data.historicalPrices.slice(0, 120)} />
            <div className="rounded-lg bg-white p-4 shadow dark:bg-slate-800">
              <h3 className="mb-2 text-lg font-semibold">AI Sentiment Summary</h3>
              <p>{data.sentiment}</p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
