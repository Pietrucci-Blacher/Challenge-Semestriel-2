import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config({ path: '../.env' });

const { MONGO_USER, MONGO_PASSWORD, MONGO_DB, MONGO_HOST, MODE, MODE_SERV } =
    process.env;
let mongo;

if (MODE === 'test') {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongo = await mongoose.connect(uri);
    console.log('Connected to mongoDB memory server');
} else {
    const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`;
    mongo = await mongoose.connect(uri);
    console.log('Connected to mongoDB');
}

export default mongo;
