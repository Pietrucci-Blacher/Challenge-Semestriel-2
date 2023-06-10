import * as AuthService from '../services/auth.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: 'Invalid data' });

    try {
        const { token } = await AuthService.login(email, password);
        if (!token) return res.status(400);
        res.status(200).json({ token });
    } catch (err) {
        if (err.name === 'NotFound') res.status(404).json(err.errors);
        else if (err.name === 'ValidationError')
            res.status(422).json(err.errors);
        else res.status(500).json(err);
    }
};

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
        return res.status(400).json({ message: 'Invalid data' });

    try {
        const result = await AuthService.register(username, email, password);
        res.status(201).json(result);
    } catch (err) {
        if (err.name === 'ValidationError') res.status(422).json(err.errors);
        else res.status(500).json(err);
    }
};

export const logout = async (req, res) => {};

export const refresh = async (req, res) => {};
