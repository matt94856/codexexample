import { Router } from 'express';
import { getStockAnalysis } from '../controllers/marketController.js';

const router = Router();

router.get('/analysis/:symbol', getStockAnalysis);

export default router;
