export default class Socket {
    static sockets = {};

    static addSocket(userId, key, socket) {
        if (!Socket.sockets[userId]) Socket.sockets[userId] = {};
        Socket.sockets[userId][key] = socket;
    }

    static updateSocket(userId, key, socket) {
        Socket.sockets[userId][key] = socket;
    }

    static removeSocket(userId, key) {
        delete Socket.sockets[userId][key];

        if (Object.keys(Socket.sockets[userId]).length === 0) {
            delete Socket.sockets[userId];
        }
    }

    static getSocket(userId, key) {
        return Socket.sockets[userId][key];
    }
}
