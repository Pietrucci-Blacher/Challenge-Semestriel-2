import Socket from '../models/mongo/socket.js';

export const addSocketId = async (socketId, userId, key) => {
    const findedSocket = await Socket.findOne({ socketId, key });

    if (findedSocket) return;

    const socket = new Socket({
        userId,
        socketId,
        key,
    });

    await socket.save();
};

export const updateSocketId = async (userId, key, socketId) => {
    await Socket.updateOne({ userId, key }, { $set: { socketId } });
};

export const removeSocketId = async (socketId) => {
    await Socket.deleteOne({
        socketId,
    });
};

export const getSocketByUserId = async (userId) => {
    const findedSocket = await Socket.find({
        userId,
    });

    return findedSocket;
};

export const getAllSocketId = async () => {
    const findedSocket = await Socket.find({});

    return findedSocket;
};
