import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import UserRouter from './routes/user.js';
import AuthRouter from './routes/auth.js';
import ChessRouter from './routes/chess.js';
import PaymentRouter from './routes/payment.js';
import ChatRouter from './routes/chat.js';
import WebhookRouter from './routes/webhook.js';
import cors from 'cors';
import SocketService from './services/socket.js';
import ChatSocket from './socket/chat.js';
import ChessSocket from './socket/chess.js';
import MatchMaking from './models/mongo/matchMaking.js';
import { isAuthenticatedForSocket } from './middleware/middleware.js';
import { gameIdRegex, gameExists } from './services/chess.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const ObjectId = mongoose.Types.ObjectId;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin:
            process.env.MODE_SERV === 'prod'
                ? process.env.VITE_ENDPOINT_FRONT_URL
                : '*',
        methods: ['GET', 'POST'],
    },
});
const chatEvent = ChatSocket(io);
const chessEvent = ChessSocket(io);

app.use(
    cors({
        origin: [process.env.VITE_ENDPOINT_FRONT_URL],
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    }),
);

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

app.use(express.raw({ type: 'application/json' }));
app.use(express.json());
app.use('/users', UserRouter);
app.use('/auth', AuthRouter);
app.use('/game', ChessRouter);
app.use('/payment', PaymentRouter);
app.use(WebhookRouter);
app.use('/chat', ChatRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', (req, res) => {
    res.json(req.body);
});

io.use(isAuthenticatedForSocket).on('connection', async (socket) => {
    if (gameIdRegex.test(socket.key)) {
        const gameId = socket.key.split('-')[1];
        if (!ObjectId.isValid(gameId) || !(await gameExists(gameId))) {
            socket.emit('gameDoesNotExist');
            return;
        }
    }

    SocketService.addSocket(socket.userId, socket.key, socket);
    chatEvent(socket);
    chessEvent(socket);

    socket.on('disconnect', () => {
        SocketService.removeSocket(socket.userId, socket.key);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    MatchMaking.deleteMany({}).then(() =>
        console.log('Socket collection cleared'),
    );
});
