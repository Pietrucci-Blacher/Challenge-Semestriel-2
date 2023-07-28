import Chess from '../models/mongo/chess.js';
import Board from './chess/Board.js';
import MatchMaking from '../models/mongo/matchMaking.js';
import * as UserServices from '../services/user.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const gameIdRegex = /^game-.+/i;

export const findGameById = (id) => {
    return Chess.findById(id);
};

export const findGameByUserId = (userId) => {
    return Chess.find({
        $or: [{ whiteUserId: userId }, { blackUserId: userId }],
    });
};

export const updateGame = async (id, data) => {
    await Chess.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                board: data.board,
                moveHistory: data.moveHistory,
                winner: data.winner,
            },
        },
    );
};

export const gameExists = async (id) => {
    const game = await Chess.findById(id);
    return !!game;
};

export const createGame = async (whiteUserId, blackUserId) => {
    const game = new Board();

    const chess = new Chess({
        whiteUserId,
        blackUserId,
        board: game.export().board,
        moveHistory: [],
    });

    return await chess.save();
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
