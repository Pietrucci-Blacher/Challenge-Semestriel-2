import { createMessage } from '../services/chat.js';
import { findGameById } from '../services/chess.js';
import SocketService from '../services/socket.js';
import { findById } from '../services/user.js';

export default (io) => (socket) => {
    socket.on('messageFromClient', async (msg) => {
        const gameId = socket.key.split('-')[1];
        const gameData = await findGameById(gameId);
        if (!gameData) return;

        await createMessage({
            sender: socket.userId,
            gameId,
            text: msg.text,
        });

        const opponentId =
            gameData.whiteUserId === socket.userId
                ? gameData.blackUserId
                : gameData.whiteUserId;

        const opponentSocket = SocketService.getSocket(opponentId, socket.key);

        const user = await findById(socket.userId);

        opponentSocket.emit('messageFromServer', {
            sender: user.username,
            text: msg.text,
        });
    });
};
