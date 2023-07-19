import db from '../../database/mongo/mongo.js';

const socketSchema = new db.Schema(
    {
        socketId: {
            type: String,
            required: true,
        },
        userId: {
            type: Number,
            required: true,
        },
        key: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const Socket = db.model('Socket', socketSchema);

export default Socket;
