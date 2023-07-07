import { createMessage } from '../services/chat.js';

export default (io) => {
    const chatMessageEvent = (socket) => {
        socket.on('chat message', async (msg) => {
            console.log('Message received:', msg);
            await createMessage(msg.userId, msg.text);
            io.emit('chat message', msg); // Broadcast the message to all connected clients
        });
    };

    return {
        chatMessageEvent,
    };
};
