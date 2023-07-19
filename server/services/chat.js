import Chat from '../models/mongo/chat.js';
// CREATE
const createMessage = async (sender, message) => {
    try {
        const chat = new Chat({
            sender,
            message,
        });
        return await chat.save();
    } catch (error) {
        console.log(error);
        throw new Error('Failed to create chat');
    }
};

// READ
const getChatById = async (chatId) => {
    try {
        return await Chat.findById(chatId).populate('sender receiver');
    } catch (error) {
        throw new Error('Failed to retrieve chat');
    }
};

const getAllChats = async () => {
    try {
        return await Chat.find().populate('sender receiver');
    } catch (error) {
        throw new Error('Failed to retrieve chats');
    }
};

// UPDATE
const updateChat = async (chatId, updates) => {
    try {
        return await Chat.findByIdAndUpdate(chatId, updates, {
            new: true,
        });
    } catch (error) {
        throw new Error('Failed to update chat');
    }
};

// DELETE
const deleteChat = async (chatId) => {
    try {
        await Chat.findByIdAndDelete(chatId);
        return 'Chat deleted successfully';
    } catch (error) {
        throw new Error('Failed to delete chat');
    }
};

export { createMessage, getChatById, getAllChats, updateChat, deleteChat };
