import db from '../../database/mongo/mongo.js';

const chessSchema = new db.Schema(
    {
        whiteUserId: {
            type: Number,
            required: true,
        },
        blackUserId: {
            type: Number,
            required: true,
        },
        winner: {
            type: Number,
        },
        moveHistory: {
            type: Array,
            required: true,
        },
        board: {
            type: Array,
            required: true,
        },
    },
    { timestamps: true },
);

const Chess = db.model('Chess', chessSchema);

export default Chess;
