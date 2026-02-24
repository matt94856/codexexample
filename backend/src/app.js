import express from 'express';
import cors from 'cors';
import marketRoutes from './routes/marketRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/market', marketRoutes);
app.use(errorHandler);

export default app;
