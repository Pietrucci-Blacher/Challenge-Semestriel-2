import * as ChessService from '../services/chess.js';

export const findGameById = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Missing id' });

    const game = await ChessService.findGameById(id);

    res.status(200).json(game);
};

export const findGameByUserId = async (req, res) => {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });

    const game = await ChessService.findGameByUserId(userId);

    res.status(200).json(game);
};

export const createGame = async (req, res) => {
    const { whiteUserId, blackUserId } = req.body;
    if (!whiteUserId || !blackUserId)
        return res.status(400).json({ error: 'Missing userId' });

    await ChessService.createGame(whiteUserId, blackUserId);

    res.sendStatus(201);
};

export const addToQueue = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });

    try {
        await ChessService.addToQueue(userId);
        res.sendStatus(201);
    } catch (err) {
        if (err.name === 'NotFound') res.status(404).json(err.errors);
        else res.status(500).json(err);
    }
};

export const removeFromQueue = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });

    await ChessService.removeFromQueue(userId);

    res.sendStatus(200);
};
