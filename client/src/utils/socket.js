import io from 'socket.io-client';
import Cookie from 'js-cookie';

export default class Socket {
    static socket = [];

    static connect(key = 'default') {
        const url = import.meta.env.VITE_VUE_APP_SOCKET_ENDPOINT;
        const token = Cookie.get('userAccessToken');

        if (!token) return null;
        if (!Socket.socket[key]?.id)
            Socket.socket[key] = io(url, { auth: { token }, query: { key } });

        return Socket.socket[key];
    }

    static disconnect() {
        if (!Socket.socket) return;

        Socket.socket.disconnect();
        Socket.socket = null;
    }

    static getSocket(key = 'default') {
        return Socket.socket[key];
    }
}
