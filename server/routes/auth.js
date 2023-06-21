import { Router } from 'express';
import * as AuthController from '../controllers/auth.js';
import { isAuthenticated } from '../middleware/middleware.js';

const router = new Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/logout', isAuthenticated, AuthController.logout);
router.post('/refresh', AuthController.refresh);

export default router;