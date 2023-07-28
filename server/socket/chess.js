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
import { findById as findUserById } from '../services/user.js';

export default (io) => (socket) => {
    socket.on('chessMoveFromClient', async (move) => {
        const gameId = socket.key.split('-')[1];
        const gameData = await findGameById(gameId);
        if (!gameData) return;

        if (gameData.winner) {
            const winner = await findUserById(gameData.winner);
            socket.emit('finish', { winner: winner.username });
            return;
        }

        if (
            socket.userId !== gameData.whiteUserId &&
            socket.userId !== gameData.blackUserId
        )
            return;

        const game = new ChessBoard({
            board: gameData.board,
            moveHistory: gameData.moveHistory,
            winner: gameData.winner || null,
        });

        const correction = {
            board: gameData.board,
            moveHistory: gameData.moveHistory,
            winner: gameData.winner || null,
        };

        if (
            (game.getTurn() === 'white' &&
                gameData.whiteUserId !== socket.userId) ||
            (game.getTurn() === 'black' &&
                gameData.blackUserId !== socket.userId)
        ) {
            socket.emit('correction', correction);
            return;
        }

        const valid = game.movePiece(
            move.fromRow,
            move.fromCol,
            move.toRow,
            move.toCol,
        );

        if (!valid) {
            socket.emit('correction', correction);
            return;
        }

        const checkmate = game.whoIsCheckmated();
        if (checkmate) {
            game.winner =
                checkmate === 'white'
                    ? gameData.blackUserId
                    : gameData.whiteUserId;

            const winner = await findUserById(game.winner);
            const looser = await findUserById(
                game.winner === gameData.whiteUserId
                    ? gameData.blackUserId
                    : gameData.whiteUserId,
            );

            const winnerElo = winner.elo;
            const looserElo = looser.elo;
            winner.calculateElo(looserElo, 1);
            looser.calculateElo(winnerElo, 0);
            winner.save();
            looser.save();

            const winnerSocket = SocketService.getSocket(winner.id, socket.key);
            const looserSocket = SocketService.getSocket(looser.id, socket.key);

            winnerSocket.emit('win', {
                player: winner.username,
                elo: winner.elo,
            });
            looserSocket.emit('loose', {
                player: looser.username,
                elo: looser.elo,
            });
        }

        const gameExport = game.export();

        await updateGame(gameId, {
            board: gameExport.board,
            moveHistory: gameExport.moveHistory,
            winner: gameExport.winner,
        });

        const opponentId =
            gameData.whiteUserId === socket.userId
                ? gameData.blackUserId
                : gameData.whiteUserId;

        const opponentSocket = SocketService.getSocket(opponentId, socket.key);

        opponentSocket.emit('chessMoveFromServer', move);
    });

    socket.on('addToQueue', async () => {
        await addToQueue(socket.userId);

        const opponentId = await findOpponent(socket.userId);
        if (!opponentId) return;

        const opponentSocket = SocketService.getSocket(opponentId, socket.key);

        await Promise.all([
            removeFromQueue(socket.userId),
            removeFromQueue(opponentId),
        ]);

        const playerId = [socket.userId, opponentId];
        if (Math.random() > 0.5) playerId.reverse();

        const game = await createGame(playerId[0], playerId[1]);

        const data = { gameId: game._id.toString() };
        for (const sock of [socket, opponentSocket])
            sock.emit('gameFound', data);
    });

    socket.on('giveUp', async () => {
        const gameId = socket.key.split('-')[1];
        const gameData = await findGameById(gameId);
        if (!gameData) return;

        if (
            socket.userId !== gameData.whiteUserId &&
            socket.userId !== gameData.blackUserId
        )
            return;

        const opponentId =
            socket.userId === gameData.whiteUserId
                ? gameData.blackUserId
                : gameData.whiteUserId;

        const [winner, looser] = await Promise.all([
            findUserById(opponentId),
            findUserById(socket.userId),
        ]);

        const winnerElo = winner.elo;
        const looserElo = looser.elo;
        winner.calculateElo(looserElo, 1);
        looser.calculateElo(winnerElo, 0);
        winner.save();
        looser.save();

        const winnerSocket = SocketService.getSocket(winner.id, socket.key);
        const looserSocket = SocketService.getSocket(looser.id, socket.key);

        winnerSocket.emit('win', {
            player: winner.username,
            elo: winner.elo,
        });
        looserSocket.emit('loose', {
            player: looser.username,
            elo: looser.elo,
        });

        await updateGame(gameId, {
            winner: winner.id,
        });
    });

    socket.on('removeFromQueue', async () => {
        await removeFromQueue(socket.userId);
    });

    socket.on('disconnect', async () => {
        await removeFromQueue(socket.userId);
    });
};
