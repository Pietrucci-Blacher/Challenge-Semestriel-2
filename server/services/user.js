import db from '../database/postgres/postgres.js';
const UserModel = db.User;
import bcrypt from 'bcrypt';
import { checkEmail } from '../utils/utils.js';

export const findAll = async (filters, options = {}) => {
    let users = await UserModel.findAll({ where: filters });

    if (options.order)
        users = users.sort((a, b) => compare(a, b, options.order));

    if (options.limit) users = users.slice(0, options.limit);

    return users;
};

export const findOne = async (filters) => {
    return UserModel.findOne({ where: filters });
};

export const create = async (data) => {
    if (!data.email || !checkEmail(data.email)) {
        const error = new Error();
        error.name = 'ValidationError';
        error.errors = {
            message: 'Email is not valid',
        };
        throw error;
    }

    if (!data.password || data.password.length < 8) {
        const error = new Error();
        error.name = 'ValidationError';
        error.errors = {
            message: 'Password must be at least 8 characters long',
        };
        throw error;
    }

    if (!data.username || data.username.length < 4) {
        const error = new Error();
        error.name = 'ValidationError';
        error.errors = {
            message: 'Username must be at least 3 characters long',
        };
        throw error;
    }

    data.password = await bcrypt.hash(data.password, 10);
    return UserModel.create(data);
};

export const replace = async (filters, newData) => {
    // TODO: faire la fonction replace
};

export const update = async (newData, filters) => {
    return UserModel.update(newData, { where: filters });
};

export const destroy = async (filters) => {
    return UserModel.destroy({ where: filters });
};

function compare(a, b, order, index = 0) {
    const [key, direction] = Object.entries(order)[index];
    if (direction === 'ASC') {
        if (a[key] === b[key]) {
            return compare(a, b, order, index + 1);
        }
        return a[key] > b[key] ? 1 : -1;
    }
    if (direction === 'DESC') {
        if (a[key] === b[key]) {
            return compare(a, b, order, index + 1);
        }
        return a[key] < b[key] ? 1 : -1;
    }
}
