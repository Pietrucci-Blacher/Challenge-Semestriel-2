import * as AuthService from '../services/auth.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await AuthService.login(email, password);
        if (!token) return res.status(400);
        return res.status(200).json({ token });
    } catch (err) {
        return res.status(500).json(err);
    }
};

export const register = async (req, res) => {};

export const logout = async (req, res) => {};

export const refresh = async (req, res) => {};
