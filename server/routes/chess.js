import { Router } from 'express';
import * as ChessController from '../controllers/chess.js';
import { isAuthenticated } from '../middleware/middleware.js';

const router = new Router();

router.post('/game', isAuthenticated, ChessController.createGame);
router.get('/game/:id', isAuthenticated, ChessController.findGameById);
router.get(
    '/game/user/:id',
    isAuthenticated,
    ChessController.findGamesByUserId,
);

router.get('/queue/:userId', isAuthenticated, ChessController.addToQueue);
router.delete(
    '/queue/:userId',
    isAuthenticated,
    ChessController.removeFromQueue,
);
