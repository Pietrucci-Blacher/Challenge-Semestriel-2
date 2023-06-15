import * as AuthService from '../services/auth.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ message: 'Invalid data' });

    try {
        const { accessToken, refreshToken } = await AuthService.login(
            email,
            password,
        );
        if (!accessToken || !refreshToken) return res.status(400);
        res.status(200).json({ accessToken, refreshToken });
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
        await AuthService.register(username, email, password);
        res.status(201).json({});
    } catch (err) {
        if (err.name === 'ValidationError') res.status(422).json(err.errors);
        else res.status(500).json(err);
    }
};

export const logout = async (req, res) => {};

export const refresh = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(422).json({ message: 'Invalid data' });

    try {
        const accessToken = await AuthService.refresh(refreshToken);

        if (!accessToken)
            return res.status(422).json({ message: 'Invalid data' });

        res.status(200).json({ accessToken });
    } catch (err) {
        if (err.name === 'ValidationError') res.status(422).json(err.errors);
        else res.status(500).json(err);
    }
};
