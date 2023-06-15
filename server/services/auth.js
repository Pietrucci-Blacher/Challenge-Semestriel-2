import * as UserService from './user.js';
import { Op } from 'sequelize';
import { checkEmail, verifyRefreshToken } from '../utils/utils.js';
import dotenv from 'dotenv';
import Token from '../models/token.js';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '../.env' });

const { JWT_REFRESH_EXPIRE } = process.env;

export const login = async (email, password) => {
    if (!checkEmail(email)) {
        const error = new Error();
        error.name = 'ValidationError';
        error.errors = {
            message: 'Email is not valid',
        };
        throw error;
    }

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

    const { accessToken, refreshToken } = user.generateToken();

    const foundedToken = await Token.findOne({ where: { userId: user.id } });
    if (foundedToken) foundedToken.destroy();

    await Token.create({
        access_token: accessToken,
        refresh_token: refreshToken,
        userId: user.id,
        expire: new Date(Date.now() + 1000 * JWT_REFRESH_EXPIRE),
    });

    return { accessToken, refreshToken };
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
};

export const refresh = async (refreshToken) => {
    const decoded = await verifyRefreshToken(refreshToken);

    const token = jwt.sign({ id: decoded.id }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRE,
    });

    await Token.update(
        { access_token: token },
        { where: { userId: decoded.id } },
    );

    return token;
};
