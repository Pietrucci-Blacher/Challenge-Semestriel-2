import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';

export const findAll = async (filters, options = {}) => {
    let users = await UserModel.findAll(filters);
    if (options.order) {
        users = users.sort((a, b) => compare(a, b, options.order));
    }
    if (options.limit) {
        users = users.slice(0, options.limit);
    }
    return users;
};

export const findOne = async (filters) => {
    return UserModel.findOne(filters);
};

export const create = async (data) => {
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
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

    if (!data.username || data.username.length < 3) {
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

export const update = async (filters, newData) => {
    return UserModel.update(newData, filters);
};

export const destroy = async (filters) => {
    return UserModel.destroy(filters);
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
