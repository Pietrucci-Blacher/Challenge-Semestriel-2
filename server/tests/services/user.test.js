import { describe, it, beforeEach } from 'vitest';
import db from './database/postgres/postgres.js';
const UserModel = db.User;
import * as UserService from './services/user.js';

let users = [];

// The two tests marked with concurrent will be run in parallel
describe('User Service', () => {
    beforeEach(async () => {
        const nbUsers = 5;
        for (let i = 0; i < nbUsers; i++) {
            const user = await UserModel.create({
                username: `user${i}`,
                password: `password${i}`,
                email: `aze${i}@aze.fr`,
            });
        }
    });
    describe('findall()', () => {
        it('should find 5 users', () => {
            console.log('serial test');
        });
    });
});
