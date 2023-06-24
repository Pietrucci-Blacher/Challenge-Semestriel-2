import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import db from './database/postgres/postgres.js';
const UserModel = db.User;
const TokenModel = db.Token;
import * as AuthService from './services/auth.js';
import * as UserService from './services/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' });

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

describe('Auth Service', () => {
    describe('register', () => {
        it('should register a user', async () => {
            const email = faker.internet.email();
            const username = faker.internet.userName();
            const password = faker.internet.password();

            await AuthService.register(username, email, password);

            const userInDb = await UserModel.findOne({
                where: { email },
            });

            expect(userInDb).toBeDefined();
            expect(userInDb.email).toEqual(email);
            expect(userInDb.username).toEqual(username);
            expect(bcrypt.compareSync(password, userInDb.password)).toBe(true);
        });
        it('should throw an error if user already exists', async () => {
            const email = faker.internet.email();
            const username = faker.internet.userName();
            const password = faker.internet.password();

            await UserModel.create({
                username,
                email,
                password: await bcrypt.hash(password, 10),
            });

            const result = AuthService.register(username, email, password);

            await expect(result).rejects.toThrow();
        });
    });

    describe('login', () => {
        it('should login a user', async () => {
            const password = faker.internet.password();
            const email = faker.internet.email();
            const username = faker.internet.userName();

            const createdUser = await UserService.create({
                username,
                email,
                password,
            });

            const { accessToken, refreshToken } = await AuthService.login(
                email,
                password,
            );
            const tokenInDb = await TokenModel.findOne({
                where: { userId: createdUser.id },
            });

            const decodedAccessToken = jwt.verify(
                accessToken,
                JWT_ACCESS_SECRET,
            );
            const decodedRefreshToken = jwt.verify(
                refreshToken,
                JWT_REFRESH_SECRET,
            );

            expect(accessToken).toBeDefined();
            expect(refreshToken).toBeDefined();
            expect(decodedAccessToken.id).toEqual(createdUser.id);
            expect(decodedRefreshToken.id).toEqual(createdUser.id);
            expect(tokenInDb).toBeDefined();
            expect(tokenInDb.refresh_token).toEqual(refreshToken);
            expect(tokenInDb.refresh_token).toEqual(refreshToken);
            expect(tokenInDb.userId).toEqual(createdUser.id);
        });
        it('should throw an error if user does not exist', async () => {
            const password = faker.internet.password();
            const email = faker.internet.email();

            const result = AuthService.login(email, password);

            await expect(result).rejects.toThrow();
        });
    });
});
