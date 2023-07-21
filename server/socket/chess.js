import {
    addToQueue,
    removeFromQueue,
    findOpponent,
} from '../services/chess.js';
import SocketService from '../services/socket.js';

export default (io) => {
    const chessEvent = (socket) => {
        socket.on('chessMove', (move) => {
            console.log('chess move received:', move, 'from', socket.id);
        });

        socket.on('addToQueue', async () => {
            console.log('add to queue received:', socket.id);
            await addToQueue(socket.userId);

            const opponentId = await findOpponent(socket.userId);
            if (!opponentId) return;

            const opponentSocket = SocketService.getSocket(
                opponentId,
                socket.key,
            );

            await Promise.all([
                removeFromQueue(socket.userId),
                removeFromQueue(opponentId),
            ]);

            const data = { gameId: 'lkjqsmldkf' };
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

    return {
        chessEvent,
    };
};
