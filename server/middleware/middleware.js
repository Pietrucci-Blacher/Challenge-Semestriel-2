import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as UserService from '../services/user.js';

dotenv.config({ path: '../.env' });

const { JWT_ACCESS_SECRET } = process.env;

export const isAuthenticated = async (req, res, next) => {
    const token = (req.headers.authorization || '').split(' ')[1];
    console.log('token', token, 'secret', JWT_ACCESS_SECRET);

    if (!token) return res.status(403).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export const isAdmin = async (req, res, next) => {
    const user = await UserService.findOne({ _id: req.userId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role !== 'admin')
        return res.status(401).json({ message: 'Require Admin Role' });

    next();
};
