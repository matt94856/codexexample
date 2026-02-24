import { formatCurrency, formatPercent } from '../utils/formatters';

function Card({ label, value }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-slate-800">
      <p className="text-sm text-slate-500 dark:text-slate-300">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}

export default function MetricsCards({ latestPrice, metrics }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card label="Latest Price" value={formatCurrency(latestPrice)} />
      <Card label="MA (50)" value={formatCurrency(metrics?.ma50)} />
      <Card label="MA (200)" value={formatCurrency(metrics?.ma200)} />
      <Card label="RSI" value={metrics?.rsi ?? 'N/A'} />
      <Card label="Revenue Growth" value={formatPercent(metrics?.revenueGrowth)} />
    </div>
  );
}
