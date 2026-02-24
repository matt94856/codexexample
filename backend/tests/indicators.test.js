import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateMovingAverages, calculateRSI, calculateRevenueGrowth } from '../src/utils/indicators.js';

test('calculate moving averages', () => {
  const data = Array.from({ length: 220 }, (_, i) => ({
    date: new Date(2024, 0, i + 1).toISOString().slice(0, 10),
    close: 100 + i
  }));

  const { ma50, ma200 } = calculateMovingAverages(data);
  assert.equal(typeof ma50, 'number');
  assert.equal(typeof ma200, 'number');
  assert.ok(ma50 > ma200 || ma50 < ma200);
});

test('calculate RSI returns bounded value', () => {
  const data = Array.from({ length: 40 }, (_, i) => ({
    date: new Date(2024, 1, i + 1).toISOString().slice(0, 10),
    close: 100 + Math.sin(i) * 10 + i
  }));

  const rsi = calculateRSI(data);
  assert.ok(rsi >= 0 && rsi <= 100);
});

test('calculate revenue growth', () => {
  const growth = calculateRevenueGrowth([
    { totalRevenue: '1200' },
    { totalRevenue: '1000' }
  ]);

  assert.equal(growth, 20);
});
