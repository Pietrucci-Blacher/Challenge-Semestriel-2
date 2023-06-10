import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const { MONGO_USER, MONGO_PASSWORD, MONGO_DB } = process.env;

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@127.0.0.1/${MONGO_DB}`;
const mongo = await mongoose.connect(uri);
console.log('Connected to mongoDB');

export default mongo;
