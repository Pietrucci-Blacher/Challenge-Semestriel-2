// import { createMessage } from '../services/chat.js';

export default (io) => {
    const chessEvent = (socket) => {
        socket.on('chessMove', async (move) => {
            console.log('chess move received:', move, 'from', socket.id);
        });
    };

    return {
        chessEvent,
    };
};
