import express from 'express';
const app = express();
import UserRouter from './routes/user.js';
import AuthRouter from './routes/auth.js';
import cors from 'cors';

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

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
