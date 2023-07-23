import Chess from '../models/mongo/chess.js';
import MatchMaking from '../models/mongo/matchMaking.js';
import * as UserServices from '../services/user.js';

export const findGameById = (id) => {
    return Chess.findById(id);
};

export const findGameByUserId = (userId) => {
    return Chess.findOne({
        $or: [{ whiteUserId: userId }, { blackUserId: userId }],
    });
};

export const createGame = async (whiteUserId, blackUserId) => {
    // TODO: init game
    const chess = new Chess({
        whiteUserId,
        blackUserId,
        board: [],
        moveHistory: [],
    });

    await chess.save();
};

export const addToQueue = async (userId) => {
    const user = await UserServices.findById(userId);
    if (!user) {
        const error = new Error();
        error.name = 'NotFound';
        error.errors = { message: 'User not found' };
        throw error;
    }

    const queue = new MatchMaking({
        userId,
        elo: user.elo,
    });

    await queue.save();
};

export const removeFromQueue = async (userId) => {
    await MatchMaking.deleteOne({ userId });
};

export const findOpponent = async (userId) => {
    const user = await UserServices.findById(userId);
    if (!user) return null;

    const queue = await MatchMaking.findOne({
        userId: { $ne: userId },
        elo: { $gte: user.elo - 100, $lte: user.elo + 100 },
    });

    if (!queue) return null;

    return queue.userId;
};
