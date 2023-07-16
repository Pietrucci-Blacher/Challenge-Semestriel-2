import * as UserService from './user.js';
import { Op } from 'sequelize';
import { checkEmail, verifyRefreshToken } from '../utils/utils.js';
import dotenv from 'dotenv';
import db from '../database/postgres/postgres.js';

export async function discordLogin(code) {
    passport.use(
        new DiscordStrategy(
            {
                clientID: process.env.DISCORD_CLIENT_ID,
                clientSecret: process.env.DISCORD_CLIENT_SECRET,
                callbackURL: process.env.DISCORD_CALLBACK_URL,
                scope: ['identify', 'email'],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const { id, username, discriminator, avatar, email } =
                        profile;
                    const user = await UserService.findOne({
                        [Op.or]: [{ discordId: id }, { email }],
                    });
                    if (!user) {
                        const newUser = await UserService.create({
                            discordId: id,
                            name: username,
                            discriminator,
                            avatar,
                            email,
                        });
                        return done(null, newUser);
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            },
        ),
    );
}

const Token = db.Token;
import jwt from 'jsonwebtoken';

dotenv.config({ path: '../.env' });

const { JWT_REFRESH_EXPIRE, JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRE } =
    process.env;

export const login = async (email, password) => {
    if (!checkEmail(email)) {
        const error = new Error();
        error.name = 'ValidationError';
        error.errors = {
            message: 'Email is not valid',
        };
        throw error;
    }

    const user = await UserService.findOne({ email });
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
        [Op.or]: [{ username }, { email }],
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

export const logout = async (userId) => {
    const foundedToken = await Token.findOne({ where: { userId } });
    foundedToken.destroy();
};

export const refresh = async (refreshToken) => {
    const decoded = await verifyRefreshToken(refreshToken);

    const token = jwt.sign({ id: decoded.id }, JWT_ACCESS_SECRET, {
        expiresIn: JWT_ACCESS_EXPIRE,
    });

    await Token.update(
        { access_token: token },
        { where: { userId: decoded.id } },
    );

    return token;
};
