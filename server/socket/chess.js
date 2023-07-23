import {
    addToQueue,
    removeFromQueue,
    findOpponent,
    createGame,
    findGameById,
} from '../services/chess.js';
import SocketService from '../services/socket.js';

export default (io) => (socket) => {
    socket.on('chessMove', async (move) => {
        console.log('chess move received:', move, 'from', socket.id);
        const gameId = socket.key.split('-')[1];
        const game = await findGameById(gameId);
    });

    socket.on('addToQueue', async () => {
        console.log('add to queue received:', socket.id);
        await addToQueue(socket.userId);

        const opponentId = await findOpponent(socket.userId);
        if (!opponentId) return;

        const opponentSocket = SocketService.getSocket(opponentId, socket.key);

        await Promise.all([
            removeFromQueue(socket.userId),
            removeFromQueue(opponentId),
        ]);

        // TODO: choose color randomly
        const game = await createGame(socket.userId, opponentId);

        const data = { gameId: game._id.toString() };
        for (const sock of [socket, opponentSocket]) {
            sock.emit('gameFound', data);
        }
    });

    socket.on('removeFromQueue', async () => {
        console.log('remove from queue received:', socket.id);
        await removeFromQueue(socket.userId);
    });

    socket.on('disconnect', async () => {
        console.log('remove from queue received:', socket.id);
        await removeFromQueue(socket.userId);
    });
};
