# MarketLens

MarketLens is a production-ready stock analysis dashboard with a Node.js/Express API and a React + Tailwind frontend.

## Features
- Ticker-based stock analysis workflow
- Real-time-like daily market data from Alpha Vantage
- Historical line chart
- Indicators: 50/200 day moving averages, RSI
- Revenue growth from fundamentals (when available)
- AI-style sentiment summary generated from quantitative signals
- Response caching layer (NodeCache)
- Dark mode toggle
- Unit tests for core calculations

## Project Structure
```
marketlens/
├── backend/
│   ├── src/
│   │   ├── cache/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   └── tests/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
├── .env.example
└── docker-compose.yml
```

## Setup
1. Copy environment template:
   ```bash
   cp .env.example .env
   ```
2. Add your `ALPHA_VANTAGE_API_KEY` to `.env`.
3. Install dependencies from repo root:
   ```bash
   npm install
   ```

## Run Locally
- Start backend:
  ```bash
  npm run server
  ```
- Start frontend (new terminal):
  ```bash
  npm run dev
  ```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:4000`

## Testing
Run backend tests:
```bash
npm test
```

## API Endpoint
`GET /api/market/analysis/:symbol`

Example response includes:
- `latestPrice`
- `metrics` (`ma50`, `ma200`, `rsi`, `revenueGrowth`)
- `sentiment`
- `historicalPrices`

## Docker
To build and run with Docker Compose:
```bash
docker compose up --build
```
