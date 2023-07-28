import { Router } from 'express';
import * as PaymentController from '../controllers/payment.js';
import { isAuthenticated } from '../middleware/middleware.js';

const router = new Router();

router.post('/verify', isAuthenticated, PaymentController.verifyPayment);

export default router;
