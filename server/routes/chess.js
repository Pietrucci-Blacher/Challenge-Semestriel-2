import { Router } from 'express';
import * as ChessController from '../controllers/chess.js';
import { isAuthenticated } from '../middleware/middleware.js';

const router = new Router();

router.get('/:id', isAuthenticated, ChessController.findGameById);

export default router;
