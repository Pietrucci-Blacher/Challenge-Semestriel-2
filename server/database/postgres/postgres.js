import connection from './db.js';
import fs from 'fs';
import path from 'path';

const db = { connection };
const dirname = path.dirname(new URL(import.meta.url).pathname);
const modelDir = path.join(dirname, '../../models/postgres');
const files = fs.readdirSync(modelDir);

for (const file of files) {
    const { default: modelFile } = await import(path.join(modelDir, file));
    const model = modelFile(connection);
    db[model.name] = model;
}

export default db;
