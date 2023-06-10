// import UserModel from '../models/user.js';
import * as UserService from './user.js';
import Token from '../models/token.js';
import { Op } from 'sequelize';

export const login = async (email, password) => {
    const user = await UserService.findOne({ where: { email } });
    if (!user) {
        const error = new Error();
        error.name = 'NotFound';
        error.errors = {
            message: 'User not found',
        };
        throw error;
    }

    const valid = await user.checkPassword(password);
    if (!valid) {
        const error = new Error();
        error.name = 'ValidationError';
        error.errors = {
            message: 'Password is not correct',
        };
        throw error;
    }

    const token = await user.generateToken();

    Token.create({
        access_token: token,
        refresh_token: 'test',
        userId: user.id,
        expire: new Date(Date.now() + 1000 * 3600),
    });

    // TODO: add refresh token
    return { token };
};

export const register = async (username, email, password) => {
    const user = await UserService.findOne({
        where: {
            [Op.or]: [{ username }, { email }],
        },
    });

    if (user) {
        const error = new Error();
        error.name = 'ValidationError';
        error.errors = {
            message: 'Username or email already exists',
        };
        throw error;
    }

    await UserService.create({ username, email, password });
    return true;
};
