import db from '../../database/mongo/mongo.js';

const chatSchema = new db.Schema(
    {
        sender: {
            type: Number,
            required: true,
        },
        receiver: {
            type: Number,
            required: false,
        },
        gameId: {
            type: String,
            required: false,
        },
        text: {
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
    },
    { timestamps: true },
);

const Chat = db.model('Chat', chatSchema);

export default Chat;
