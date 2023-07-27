import { Router } from 'express';
import * as ChatController from '../controllers/chat.js';
import { isAuthenticated } from '../middleware/middleware.js';

const router = new Router();

router.get('/:id', isAuthenticated, ChatController.findChatById);
router.get('/game/:gameId', isAuthenticated, ChatController.findChatByGameId);

router.post('/:id/report', isAuthenticated, ChatController.reportChat);

export default router;
