export function formatCurrency(value) {
  if (value === null || value === undefined) return 'N/A';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function formatPercent(value) {
  if (value === null || value === undefined) return 'N/A';
  return `${value.toFixed(2)}%`;
}
