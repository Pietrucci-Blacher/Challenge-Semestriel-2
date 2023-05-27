import express from 'express';
import mainRoute from './router/mainRoute.js';

const app = express();
const port = 3000;

app.use(mainRoute);

app.use(express.static('client/src'));

app.listen(port, () => console.log(`Server running on port ${port}`));
