import genericRouter from './generic.js';
import genericController from '../controllers/generic.js';
import UserService from '../services/user.js';

export default new genericRouter(new genericController(new UserService()));
