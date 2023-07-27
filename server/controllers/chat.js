import * as ChatService from '../services/chat.js';

export const findChatById = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Invalid id' });

    const chat = await ChatService.findChatById(id);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    res.status(200).json(chat);
};

export const findChatByGameId = async (req, res) => {
    const { gameId } = req.params;
    if (!gameId) return res.status(400).json({ message: 'Invalid gameId' });

    const chat = await ChatService.findChatByGameId(gameId);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    res.status(200).json(chat);
};

export const reportChat = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Invalid id' });

    const reportedChat = await ChatService.reportChat(id);
    if (!reportedChat)
        return res.status(500).json({ message: 'Error reporting chat' });

    res.status(200).json(reportedChat);
};
