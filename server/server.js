import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import UserRouter from './routes/user.js';
import AuthRouter from './routes/auth.js';
import cors from 'cors';
import { addSocketId, removeSocketId } from './services/socket.js';
import ChatSocket from './socket/chat.js';
import ChessSocket from './socket/chess.js';
import Socket from './models/mongo/socket.js';
import { isAuthenticatedForSocket } from './middleware/middleware.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        // origin: process.env.VITE_VUE_APP_SOCKET_ENDPOINT,
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
const { chatMessageEvent } = ChatSocket(io);
const { chessEvent } = ChessSocket(io);

app.use(cors());

app.use((req, res, next) => {
    if (
        ['POST', 'PATCH', 'PUT'].includes(req.method) &&
        !req.is('application/json')
    ) {
        res.sendStatus(400);
    } else {
        next();
    }
});

app.use(express.json());
app.use('/users', UserRouter);
app.use('/auth', AuthRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', (req, res) => {
    res.json(req.body);
});

io.use(isAuthenticatedForSocket).on('connection', (socket) => {
    console.log('A user connected', socket.id, socket.userId);

    addSocketId(socket.id, socket.userId);
    chatMessageEvent(socket);
    chessEvent(socket);

    socket.on('disconnect', () => {
        removeSocketId(socket.id);
        console.log('A user disconnected', socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    Socket.deleteMany({}).then(() => console.log('Socket collection cleared'));
});
