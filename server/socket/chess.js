import {
    addToQueue,
    removeFromQueue,
    findOpponent,
    createGame,
    findGameById,
    updateGame,
} from '../services/chess.js';
import SocketService from '../services/socket.js';
import ChessBoard from '../services/chess/Board.js';

export default (io) => (socket) => {
    socket.on('chessMoveFromClient', async (move) => {
        console.log('chess move received:', move, 'from', socket.id);
        const gameId = socket.key.split('-')[1];
        const gameData = await findGameById(gameId);
        if (!gameData) return;

        const game = new ChessBoard({
            board: gameData.board,
            moveHistory: gameData.moveHistory,
            winner: gameData.winner || null,
        });

        const valid = game.movePiece(
            move.fromRow,
            move.fromCol,
            move.toRow,
            move.toCol,
        );

        console.log('valid move', valid);

        if (!valid) return;

        const gameExport = game.export();

        await updateGame(gameId, {
            board: gameExport.board,
            moveHistory: gameExport.moveHistory,
        });

        const opponentId =
            gameData.whiteUserId === socket.userId
                ? gameData.blackUserId
                : gameData.whiteUserId;

        console.log('opponent id', opponentId);

        const opponentSocket = SocketService.getSocket(opponentId, socket.key);

        opponentSocket.emit('chessMoveFromServer', move);
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
