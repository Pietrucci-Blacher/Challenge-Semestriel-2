import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../models/token.js';

dotenv.config({ path: '../.env' });

const { JWT_REFRESH_SECRET } = process.env;

export const checkEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const verifyRefreshToken = async (refreshToken) => {
    const token = await Token.findOne({
        where: { refresh_token: refreshToken },
    });
    if (!token) {
        const error = new Error();
        error.name = 'ValidationError';
        error.errors = {
            message: 'Invalid refresh token',
        };
        throw error;
    }

    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        return decoded;
    } catch (err) {
        const error = new Error();
        error.name = 'ValidationError';
        error.errors = {
            message: 'Invalid refresh token',
        };
        throw error;
    }
};
