import { Router } from 'express';
import * as PaymentController from '../controllers/payment.js';

const router = new Router();

router.post('/verify', PaymentController.verifyPayment);

export default router;
