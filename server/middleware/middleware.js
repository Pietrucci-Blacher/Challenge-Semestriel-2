import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { JWT_SECRET } = process.env;

export const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(403).json({ message: 'No token provided!' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized!' });
    }
};
