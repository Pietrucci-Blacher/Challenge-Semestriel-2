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

    static disconnect(key = 'default') {
        if (!Socket.socket[key]?.id) return;

        Socket.socket[key]?.disconnect();
        delete Socket.socket[key];
    }

    static getSocket(key = 'default') {
        return Socket.socket[key];
    }
}
