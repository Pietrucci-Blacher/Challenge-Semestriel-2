import { Router } from 'express';
import * as UserController from '../controllers/user.js';
import { isAuthenticated, isAdmin } from '../middleware/middleware.js';

const router = new Router();

router.get('/', isAuthenticated, isAdmin, UserController.getAll);
router.post('/', isAuthenticated, isAdmin, UserController.create);

router.get('/:id', isAuthenticated, UserController.getOne);
router.put('/:id', isAuthenticated, UserController.replace);
router.patch('/:id', isAuthenticated, UserController.update);
router.delete('/:id', isAuthenticated, UserController.destroy);

router.get(
    '/:id/statsGame',
    isAuthenticated,
    UserController.getStatsPlayedGames,
);
router.patch('/:id/password', isAuthenticated, UserController.changePassword);

export default router;
