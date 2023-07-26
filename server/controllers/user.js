import * as UserService from '../services/user.js';
import * as Authservice from '../services/auth.js';

export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    console.log('oldPassword', oldPassword, 'newPassword', newPassword);

    if (!oldPassword || !newPassword)
        return res.status(400).json({
            message: 'Missing required fields',
        });

    const userId = parseInt(
        req.params.id === 'me' ? req.userId : req.params.id,
    );

    console.log('userId', userId, 'req.userId', req.userId);

    if (userId !== req.userId)
        return res.status(403).json({
            message: "You don't have the permission to modify this resource",
        });

    try {
        await UserService.changePassword(userId, oldPassword, newPassword);
        res.sendStatus(201);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).json(err.message);
        } else {
            res.status(500).json(err);
        }
    }
};

export const getAll = async (req, res) => {
    const { page, itemsPerPage, order, ...filters } = req.query;
    try {
        const results = await UserService.findAll(filters, {
            order,
            limit: itemsPerPage,
            offset: (page - 1) * itemsPerPage,
        });

        res.json(results);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getOne = async (req, res) => {
    const userId = parseInt(
        req.params.id === 'me' ? req.userId : req.params.id,
    );

    try {
        const result = await UserService.findOne({ id: userId });
        if (result) res.json(result);
        else res.sendStatus(404);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const create = async (req, res) => {
    const { body } = req;
    try {
        const result = await UserService.create(body);
        res.status(201).json(result);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).json(err.errors);
        } else {
            res.status(500).json(err);
        }
    }
};

export const replace = async (req, res) => {
    const id = parseInt(req.params.id);
    const { body } = req;

    if (id !== req.userId)
        return res.status(403).json({
            message: "You don't have the permission to modify this resource",
        });

    try {
        const [[result, created]] = await UserService.replace(
            { id },
            { id, ...body },
        );
        if (created) res.status(201).json(result);
        else res.json(result);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).json(err.errors);
        } else {
            res.status(500).json(err);
        }
    }
};

export const update = async (req, res) => {
    const id = parseInt(req.params.id);
    const { body } = req;

    if (id !== req.userId)
        return res.status(403).json({
            message: "You don't have the permission to modify this resource",
        });

    try {
        const [result] = await UserService.update(body, { id });
        if (result) res.json(result);
        else res.sendStatus(404);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(422).json(err.errors);
        } else {
            res.status(500).json(err);
        }
    }
};

export const destroy = async (req, res) => {
    const id = parseInt(req.params.id);

    const user = await UserService.findById(req.userId);
    if (id !== req.userId && user.role !== 'admin')
        return res.status(403).json({
            message: "You don't have the permission to modify this resource",
        });

    try {
        await Authservice.logout(id);
        const nbDeleted = await UserService.destroy({
            id: parseInt(id),
        });
        if (nbDeleted) res.sendStatus(204);
        else res.sendStatus(404);
    } catch (err) {
        res.status(500).json(err);
    }
};

/**
 * Get the stats of a user
 *
 * @route GET /users/:id/statsGame
 * @group User - Operations about user
 *
 * @param {integer} id.path.required - id of the user ('me' for the current user)
 *
 * @returns {object} 200 - Stats of the user
 * @returns {Error}  500 - Unexpected error
 */
export const getStatsPlayedGames = async (req, res) => {
    const userId = parseInt(
        req.params.id === 'me' ? req.userId : req.params.id,
    );

    try {
        const result = await UserService.statsPlayedGames(userId);
        return res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};
