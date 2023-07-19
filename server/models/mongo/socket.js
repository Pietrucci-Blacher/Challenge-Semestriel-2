import db from '../../database/mongo/mongo.js';

const socketSchema = new db.Schema(
    {
        socketId: {
            type: String,
            required: true,
        },
        userId: Number,
    },
    { timestamps: true },
);

const Socket = db.model('Socket', socketSchema);

export default Socket;
