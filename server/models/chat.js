import db from '../database/mongo/mongo.js';

const chatSchema = new db.Schema({
    sender: {
        type: Number,
        ref: 'User',
        required: true,
    },
    receiver: {
        type: Number,
        ref: 'User',
        required: false,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    isPublic: {
        type: Boolean,
        default: true,
        required: false,
    },
});

const Chat = db.model('Chat', chatSchema);

export default Chat;
