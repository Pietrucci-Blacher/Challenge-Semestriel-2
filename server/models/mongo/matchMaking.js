import db from '../../database/mongo/mongo.js';

const matchMakingSchema = new db.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        elo: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true },
);

const MatchMaking = db.model('MatchMaking', matchMakingSchema);

export default MatchMaking;
