import { Router } from 'express';
import * as ChatController from '../controllers/chat.js';
import { isAuthenticated } from '../middleware/middleware.js';

const router = new Router();

router.get('/:gameId', isAuthenticated, ChatController.findChatByGameId);

export default router;
