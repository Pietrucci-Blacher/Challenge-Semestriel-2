import connection from './db.js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const { MODE } = process.env;

const db = { connection };
const dirname = path.dirname(new URL(import.meta.url).pathname);
const modelDir = path.join(dirname, '../../models/postgres');
const files = fs.readdirSync(modelDir);

for (const file of files) {
    if (file.endsWith('.js')) {
        const modelFile = await import(path.join(modelDir, file));
        const model = modelFile.default(connection);
        db[model.name] = model;
    }
}

if (MODE === 'test') await connection.sync();

export default db;
