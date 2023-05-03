import express from 'express';
import mainRoute from './router/mainRoute.js';

const app = express();
const port = 3000;

app.use(mainRoute);

app.listen(port, () => console.log(`Server running on port ${port}`));
