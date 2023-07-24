import * as UserService from '../services/user.js';
import * as Authservice from '../services/auth.js';

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
    console.log('req', req.userId);
    console.log('id', id);
    console.log('role', user.role);
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
