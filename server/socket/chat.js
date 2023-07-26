import * as ChatService from '../services/chat.js';
import * as ChessService from '../services/chess.js';
import SocketService from '../services/socket.js';
import * as UserService from '../services/user.js';

export default (io) => (socket) => {
    socket.on('messageFromClient', async (msg) => {
        const gameId = socket.key.split('-')[1];
        const gameData = await ChessService.findGameById(gameId);
        if (!gameData) return;

        if (
            socket.userId !== gameData.whiteUserId &&
            socket.userId !== gameData.blackUserId
        )
            return;

        const chat = await ChatService.createMessage({
            sender: socket.userId,
            gameId,
            text: msg.text,
        });

        const opponentId =
            gameData.whiteUserId === socket.userId
                ? gameData.blackUserId
                : gameData.whiteUserId;

        const opponentSocket = SocketService.getSocket(opponentId, socket.key);

        const user = await UserService.findById(socket.userId);

        opponentSocket.emit('messageFromServer', {
            id: chat._id.toString(),
            sender: user.username,
            text: msg.text,
        });
    });
};
