import io from 'socket.io-client';
import Cookie from 'js-cookie';

export default class Socket {
    static socket = null;

    static connect() {
        const url = import.meta.env.VITE_VUE_APP_SOCKET_ENDPOINT;
        const token = Cookie.get('userAccessToken');

        if (!token) return null;
        if (!Socket.socket?.id) Socket.socket = io(url, { auth: { token } });

        return Socket.socket;
    }

    static disconnect() {
        if (!Socket.socket) return;

        Socket.socket.disconnect();
        Socket.socket = null;
    }
}
