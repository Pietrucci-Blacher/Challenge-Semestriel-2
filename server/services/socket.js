import Socket from '../models/mongo/socket.js';

export const addSocketId = async (socketId, userId = null) => {
    const findedSocket = await Socket.findOne({
        socketId,
    });

    if (findedSocket) return;

    const socket = new Socket({
        userId,
        socketId,
    });

    await socket.save();
};

export const updateSocketId = async (socketId, userId) => {
    await Socket.updateOne({ socketId }, { $set: { userId } });
};

export const removeSocketId = async (socketId) => {
    await Socket.deleteOne({
        socketId,
    });
};

export const getSocketByUserId = async (userId) => {
    const findedSocket = await Socket.findOne({
        userId,
    });

    return findedSocket;
};

export const getAllSocketId = async () => {
    const findedSocket = await Socket.find({});

    return findedSocket;
};
