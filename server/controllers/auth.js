import * as AuthService from '../services/auth.js';
import passport from 'passport';

export let googleLogin = async (req, res) => {
    return;
};

/**
 * Logs into Discord using the provided code and returns the user information.
 *
 * @param {Object} req - The request object containing the code.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise<void>} - A promise that resolves once the response is sent.
 */
export let discordLogin = async (req, res) => {
    try {
        // Get the code from the request query
        const { code } = req.query;
        // Get the user information from Discord
        passport.authenticate(AuthService.discordLogin(code));

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging into Discord:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export let discordLogin = async (req, res) => {};

/**
 * Logs into Discord using the provided code and returns the user information.
 *
 * @param {Object} req - The request object containing the code.
 * @param {Object} res - The response object to send the result.
 * @returns {Promise<void>} - A promise that resolves once the response is sent.
 */
export let discordLogin = async (req, res) => {
    try {
        const { code } = req.body;
        const test = await AuthService.discordLogin(code);
        res.status(statusCode).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging into Discord:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * login route
 *
 * @route POST /auth/login
 * @group auth - Operations about auth
 *
 * @param {string} email.body.required - email
 * @param {string} password.body.required - password
 *
 * @returns {object} 200 - An object with accessToken and refreshToken
 * @returns {Error}  400 - Invalid data
 * @returns {Error}  404 - User not found
 * @returns {Error}  422 - Validation error
 * @returns {Error}  500 - Unexpected error
 */
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

/**
 * register route
 *
 * @route POST /auth/register
 * @group auth - Operations about auth
 *
 * @param {string} username.body.required - username
 * @param {string} email.body.required - email
 * @param {string} password.body.required - password
 *
 * @returns {object} 201 - An empty object
 * @returns {Error}  400 - Invalid data
 * @returns {Error}  422 - Validation error
 * @returns {Error}  500 - Unexpected error
 */
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

/**
 * logout route
 *
 * @route GET /auth/logout
 * @group auth - Operations about auth
 *
 * @param {string} authorization.header.required - access token
 *
 * @returns {object} 200 - An empty object
 * @returns {Error}  400 - Invalid data
 * @returns {Error}  500 - Unexpected error
 */
export const logout = async (req, res) => {
    if (!req.userId) return res.status(400).json({ message: 'Invalid data' });
    try {
        await AuthService.logout(req.userId);
        res.status(200).json({});
    } catch (err) {
        res.status(500).json(err);
    }
};

/**
 * refresh route
 *
 * @route POST /auth/refresh
 * @group auth - Operations about auth
 *
 * @param {string} refreshToken.body.required - refresh token
 *
 * @returns {object} 200 - An object with accessToken
 * @returns {Error}  422 - Validation error
 * @returns {Error}  500 - Unexpected error
 * @returns {Error}  404 - Refresh token not found
 * @returns {Error}  401 - Invalid refresh token
 */
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
