import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as UserService from '../services/user.js';
import db from '../database/postgres/postgres.js';
const Token = db.Token;

dotenv.config({ path: '../.env' });

const { JWT_ACCESS_SECRET } = process.env;

export const isAuthenticated = async (req, res, next) => {
    const token = (req.headers.authorization || '').split(' ')[1];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    const foundedToken = await Token.findOne({
        where: { access_token: token },
    });
    if (!foundedToken)
        return res.status(404).json({ message: 'Token not found' });

    try {
        const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export const isAdmin = async (req, res, next) => {
    const user = await UserService.findOne({ id: req.userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role !== 'admin')
        return res.status(403).json({ message: 'Require Admin Role' });

    next();
};

export const isAuthenticatedForSocket = async (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) return next(new Error('No token provided'));

    const foundedToken = await Token.findOne({
        where: { access_token: token },
    });
    if (!foundedToken) return next(new Error('Token not found'));

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        socket.userId = decoded.id;
        socket.key = socket.handshake.query.key;
        next();
    } catch (err) {
        return next(new Error('Authentication error'));
    }
};
