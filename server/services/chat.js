import Chat from '../models/mongo/chat.js';

export const createMessage = async (data) => {
    const chat = new Chat(data);
    return await chat.save();
};

export const findChatById = (chatId) => {
    return Chat.findById(chatId);
};

export const findChatByGameId = (gameId) => {
    return Chat.find({ gameId, reported: false });
};

export const findAllChats = () => {
    return Chat.find();
};

export const updateChat = (chatId, updates) => {
    return Chat.findByIdAndUpdate(chatId, updates, { new: true });
};

export const deleteChat = (chatId) => {
    return Chat.findByIdAndDelete(chatId);
};

export const reportChat = (chatId) => {
    return updateChat(chatId, { reported: true });
};

export const findReportedChats = async () => {
    const chats = await Chat.aggregate([
        { $match: { reported: true } },
        {
            $group: {
                _id: '$gameId',
                data: { $addToSet: '$$ROOT' },
            },
        },
        {
            $project: {
                _id: 0,
                gameId: '$_id',
                data: 1,
            },
        },
    ]);

    const result = chats.reduce(
        (acc, chat) => ({ ...acc, [chat.gameId]: chat.data }),
        {},
    );

    return result;
};
