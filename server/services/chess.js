import Chess from '../models/mongo/chess.js';

export const findGameById = (id) => {
    return Chess.findById(id);
};

export const findGameByUserId = (userId) => {
    return Chess.findOne({
        $or: [{ whiteUserId: userId }, { blackUserId: userId }],
    });
};

export const createGame = (whiteUserId, blackUserId) => {
    // TODO: init game
    return Chess.create({
        whiteUserId,
        blackUserId,
        board: [],
        moveHistory: [],
    });
};
