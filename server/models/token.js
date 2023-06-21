import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/postgres.js';
import User from './user.js';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const { DB_FORCE } = process.env;

class Token extends Model {}

Token.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        access_token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        expire: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Token',
        tableName: 'token',
        timestamps: true,
    },
);

Token.sync({ force: DB_FORCE === 'true' });

export default Token;
