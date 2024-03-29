import db from '../database/postgres/postgres.js';
const UserModel = db.User;
import bcrypt from 'bcrypt';
import { checkEmail } from '../utils/utils.js';
import ChessModel from '../models/mongo/chess.js';

export const findAll = async (filters, options = {}) => {
    let users = await UserModel.findAll({ where: filters });

    if (!options.reomvePass)
        for (const user of users) delete user.dataValues.password;

    if (options.order)
        users = users.sort((a, b) => compare(a, b, options.order));

    if (options.limit) users = users.slice(0, options.limit);

    return users;
};

export const findOne = async (filters, removePass = false) => {
    const user = await UserModel.findOne({ where: filters });
    if (removePass && user) delete user.dataValues.password;

    return user;
};

export const findById = (id, showPass = false) => {
    return UserModel.findOne({ where: { id } }, showPass);
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

export const replace = async (newData, filters) => {
    await UserModel.destroy({ where: filters });
    const data = { ...newData, id: filters.id };
    return create(data);
};

export const update = (newData, filters) => {
    return UserModel.update(newData, { where: filters });
};

export const destroy = (filters) => {
    return UserModel.destroy({ where: filters });
};

export const statsPlayedGames = async (id) => {
    const group = [
        {
            $group: {
                _id: null,
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
            },
        },
    ];

    const games = await ChessModel.aggregate([
        {
            $match: {
                $or: [{ whiteUserId: id }, { blackUserId: id }],
            },
        },
        {
            $facet: {
                total: group,
                white: [{ $match: { whiteUserId: id } }, ...group],
                black: [{ $match: { blackUserId: id } }, ...group],
                win: [{ $match: { winner: id } }, ...group],
            },
        },
        {
            $project: {
                total: { $arrayElemAt: ['$total.count', 0] },
                white: { $arrayElemAt: ['$white.count', 0] },
                black: { $arrayElemAt: ['$black.count', 0] },
                win: { $arrayElemAt: ['$win.count', 0] },
            },
        },
    ]);

    return games[0];
};

export const changePassword = async (id, oldPassword, newPassword) => {
    const user = await findById(id);

    if (!user) {
        const error = new Error();
        error.name = 'NotFoundError';
        error.errors = {
            message: 'User not found',
        };
        throw error;
    }

    const isPasswordValid = await user.checkPassword(oldPassword);
    if (!isPasswordValid) {
        const error = new Error();
        error.name = 'ValidationError';
        error.errors = {
            message: 'Old password is not valid',
        };
        throw error;
    }

    if (!newPassword || newPassword.length < 8) {
        const error = new Error();
        error.name = 'ValidationError';
        error.errors = {
            message: 'Password must be at least 8 characters long',
        };
        throw error;
    }

    await user.hashPassword(newPassword);
    await user.save();
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
