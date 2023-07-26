import Cookie from 'js-cookie';

export default class Chat {
    static instance;
    socket;
    messages = [];
    gameId;

    constructor() {}

    static getInstance() {
        if (!Chat.instance) Chat.instance = new Chat();
        return Chat.instance;
    }

    static destroyInstance() {
        Chat.instance = null;
    }

    initEventListeners(vue) {
        this.socket.on('messageFromServer', (message) => {
            this.addMessage(message);
            vue.forceReload();
        });
    }

    async initData() {
        const url = import.meta.env.VITE_ENDPOINT_BACK_URL;

        const data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookie.get('userAccessToken')}`,
            },
        };

        const [chatRes, gameRes] = await Promise.all([
            fetch(`${url}/chat/${this.gameId}`, data),
            fetch(`${url}/game/${this.gameId}`, data),
        ]);

        const [chatData, gameData] = await Promise.all([
            chatRes.json(),
            gameRes.json(),
        ]);

        const [meRes, whiteRes, blackRes] = await Promise.all([
            fetch(`${url}/users/me`, data),
            fetch(`${url}/users/${gameData.whiteUserId}`, data),
            fetch(`${url}/users/${gameData.blackUserId}`, data),
        ]);

        const [me, white, black] = await Promise.all([
            meRes.json(),
            whiteRes.json(),
            blackRes.json(),
        ]);

        if (me.id !== gameData.whiteUserId && me.id !== gameData.blackUserId)
            return;

        const opponent = gameData.whiteUserId === me.id ? black : white;

        for (const message of chatData) {
            const data = {
                text: message.text,
            };

            if (message.sender !== me.id) data.sender = opponent.username;

            this.addMessage(data);
        }
    }

    connectToSocket(socket) {
        this.socket = socket;
    }

    disconnectFromSocket() {
        if (!this.socket) return;
        this.socket.disconnect();
        this.socket = null;
    }

    sendMessage(message) {
        if (!this.socket) return;
        this.addMessage(message);
        this.socket.emit('messageFromClient', message);
    }

    addMessage(message) {
        this.messages.push(message);
    }
}
