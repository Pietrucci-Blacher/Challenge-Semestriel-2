import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import db from './database/postgres/postgres.js';
const UserModel = db.User;
import * as UserService from './services/user.js';
import bcrypt from 'bcrypt';

describe('User Service', () => {
    let users;
    const nbUsers = 5;

    beforeEach(async () => {
        let usersTmp = [];

        for (let i = 0; i < nbUsers; i++) {
            usersTmp = [
                ...usersTmp,
                {
                    username: faker.internet.userName(),
                    password: await bcrypt.hash(faker.internet.password(), 10),
                    email: faker.internet.email(),
                },
            ];
        }

        users = await UserModel.bulkCreate(usersTmp);
    });

    afterEach(async () => {
        await UserModel.destroy({ where: {} });
    });

    describe('findall()', () => {
        it('should find 5 users', async () => {
            const result = await UserService.findAll();
            expect(result).toHaveLength(nbUsers);

            for (let i = 0; i < result.length; i++) {
                const user = result[i];
                expect(user).toBeDefined();
                expect(user.username).toEqual(users[i].username);
                expect(user.email).toEqual(users[i].email);
                expect(user.password).toEqual(users[i].password);
            }
        });
        it('should not find 5 users', async () => {
            UserModel.destroy({ where: {} });

            const result = await UserService.findAll();
            expect(result).toHaveLength(0);
        });
    });

    describe('findOne()', () => {
        it('should find one user', async () => {
            const user = users[0];

            const result = await UserService.findOne({ id: user.id });

            expect(result).toBeDefined();
            expect(result.username).toEqual(user.username);
            expect(result.email).toEqual(user.email);
            expect(result.password).toEqual(user.password);
        });
        it('should not find one user', async () => {
            const result = await UserService.findOne({ id: 999 });

            expect(result).toBeNull();
        });
    });

    describe('create()', () => {
        it('should create a user', async () => {
            const password = faker.internet.password();
            const user = {
                username: faker.internet.userName(),
                password,
                email: faker.internet.email(),
            };

            const result = await UserService.create(user);
            const userInDb = await UserModel.findOne({
                where: { id: result.id },
            });

            expect(result).toBeDefined();
            expect(result.username).toEqual(user.username);
            expect(result.email).toEqual(user.email);
            expect(result.password).toBeDefined();
            expect(userInDb).toBeDefined();
            expect(userInDb.username).toEqual(user.username);
            expect(userInDb.email).toEqual(user.email);
            expect(bcrypt.compareSync(password, userInDb.password)).toBe(true);
        });
        it('should not create a user for not valid email', async () => {
            const user = {
                username: faker.internet.userName(),
                password: faker.internet.password(),
                email: faker.lorem.word(),
            };

            const result = UserService.create(user);

            await expect(result).rejects.toThrow();
        });
        it('should not create a user for not valid password', async () => {
            const user = {
                username: faker.internet.userName(),
                password: faker.lorem.word(3),
                email: faker.internet.email(),
            };

            const result = UserService.create(user);

            await expect(result).rejects.toThrow();
        });
        it('should not create a user for not valid username', async () => {
            const user = {
                username: faker.lorem.word(3),
                password: faker.internet.password(),
                email: faker.internet.email(),
            };

            const result = UserService.create(user);

            await expect(result).rejects.toThrow();
        });
    });

    describe('update()', () => {
        it('should update a user', async () => {
            const user = users[0];
            const newData = {
                username: faker.internet.userName(),
                email: faker.internet.email(),
            };

            const result = await UserService.update(newData, { id: user.id });
            const userInDb = await UserModel.findOne({
                where: { id: user.id },
            });

            expect(result).toBeDefined();
            expect(result[0]).toEqual(1);
            expect(userInDb).toBeDefined();
            expect(userInDb.username).toEqual(newData.username);
            expect(userInDb.email).toEqual(newData.email);
        });
        it('should not update a user', async () => {
            const newData = {
                username: faker.internet.userName(),
                email: faker.internet.email(),
            };

            const result = await UserService.update(newData, { id: 0 });

            expect(result).toBeDefined();
            expect(result[0]).toEqual(0);
        });
    });

    describe('replace()', () => {
        it('should replace a user', async () => {
            const user = users[0];
            const newData = {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
            };

            const result = await UserService.replace(newData, { id: user.id });
            const userInDb = await UserModel.findOne({
                where: { id: user.id },
            });

            expect(result).toBeDefined();
            expect(result.username).toEqual(newData.username);
            expect(result.email).toEqual(newData.email);
            expect(userInDb).toBeDefined();
            expect(userInDb.username).toEqual(newData.username);
            expect(userInDb.email).toEqual(newData.email);
            expect(
                bcrypt.compareSync(newData.password, userInDb.password),
            ).toBeTruthy();
        });
    });

    describe('destroy', () => {
        it('should destroy a user', async () => {
            const user = users[0];

            const result = await UserService.destroy({ id: user.id });
            const userInDb = await UserModel.findOne({
                where: { id: user.id },
            });

            expect(result).toBeDefined();
            expect(result).toEqual(1);
            expect(userInDb).toBeNull();
        });
        it('should not destroy a user', async () => {
            const result = await UserService.destroy({ id: 0 });

            expect(result).toBeDefined();
            expect(result).toEqual(0);
        });
    });
});
