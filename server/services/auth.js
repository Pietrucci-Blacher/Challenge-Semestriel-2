import * as UserService from './user.js';
import { Op } from 'sequelize';
import { checkEmail, verifyRefreshToken } from '../utils/utils.js';
import dotenv from 'dotenv';
import db from '../database/postgres/postgres.js';
import passport from 'passport';
import { Strategy, Scope } from '@oauth-everything/passport-discord';
import GoogleStrategy from 'passport-google-oauth20';

export async function discordLogin() {
    passport.use(
        new Strategy(
            {
                clientID: process.env.VITE_DISCORD_CLIENT_ID,
                clientSecret: process.env.VITE_DISCORD_CLIENT_SECRET,
                callbackURL: process.env.VITE_DISCORD_CALLBACK_URL,
                scope: [Scope.IDENTIFY, Scope.EMAIL],
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log('profile', profile);
                try {
                    const user = await UserService.findOne({
                        where: {
                            [Op.or]: [
                                { discordId: profile.id },
                                { email: profile.email },
                            ],
                        },
                    });

                    if (!user) {
                        const newUser = await UserService.create({
                            discordId: profile.id,
                            email: profile.email,
                            username: profile.username,
                            avatar: profile.avatar,
                        });
                        return done(null, newUser);
                    }

                    if (!user.discordId) {
                        user.discordId = profile.id;
                        await user.save();
                    }

                    return done(null, user);
                } catch (error) {
                    console.error('Error logging into Discord:', error);
                    return done(error);
                }
            },
        ),
    );
}

export async function googleLogin() {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.VITE_GOOGLE_CLIENT_ID,
                clientSecret: process.env.VITE_GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.VITE_GOOGLE_CALLBACK_URL,
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = await UserService.findOne({
                        where: {
                            [Op.or]: [
                                { googleId: profile.id },
                                { email: profile.email },
                            ],
                        },
                    });

                    if (!user) {
                        const newUser = await UserService.create({
                            googleId: profile.id,
                            email: profile.email,
                            username: profile.displayName,
                            avatar: profile.photos[0].value,
                        });
                        return done(null, newUser);
                    }

                    if (!user.googleId) {
                        user.googleId = profile.id;
                        await user.save();
                    }

                    return done(null, user);
                } catch (error) {
                    console.error('Error logging into Google:', error);
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
    if (!foundedToken) return;
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
