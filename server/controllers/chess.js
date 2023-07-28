import * as ChessService from '../services/chess.js';

export const findGameById = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Missing id' });

    const game = await ChessService.findGameById(id);

    if (!game) return res.status(404).json({ message: 'Game not found' });
    if (req.userId !== game.whiteUserId && req.userId !== game.blackUserId)
        return res.status(403).json({ message: 'Unauthorized' });

    res.status(200).json(game);
};

export const findGameByUserId = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Missing userId' });

    const userId = parseInt(id === 'me' ? req.userId : id);
    const game = await ChessService.findGameByUserId(userId).select('-board');

    if (!game) return res.status(404).json({ message: 'Game not found' });

    const result = {
        userId: req.userId,
        game,
    };

    res.status(200).json(result);
};

export const createGame = async (req, res) => {
    const { whiteUserId, blackUserId } = req.body;
    if (!whiteUserId || !blackUserId)
        return res.status(400).json({ message: 'Missing userId' });

    await ChessService.createGame(whiteUserId, blackUserId);

    res.sendStatus(201);
};

export const addToQueue = async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: 'Missing userId' });

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
    if (!userId) return res.status(400).json({ message: 'Missing userId' });

    await ChessService.removeFromQueue(userId);

    res.sendStatus(200);
};
