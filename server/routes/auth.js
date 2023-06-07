import { Router } from 'express';
import { login, register, logout, refresh } from '../controllers/auth.js';
import { isAuthenticated } from '../middleware/middleware.js';

const router = new Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', isAuthenticated, logout);
router.post('/refresh', isAuthenticated, refresh);

export default router;
