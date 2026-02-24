import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function StockChart({ data = [] }) {
  const chartData = {
    labels: data.map((point) => point.date).reverse(),
    datasets: [
      {
        label: 'Close Price',
        data: data.map((point) => point.close).reverse(),
        borderColor: '#3b82f6',
        borderWidth: 2,
        tension: 0.2
      }
    ]
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-slate-800">
      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
    </div>
  );
}
