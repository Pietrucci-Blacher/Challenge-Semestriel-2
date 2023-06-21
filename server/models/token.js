import { DataTypes, Model } from 'sequelize';
import UserFunc from './user.js';
import sequelize from '../database/postgres.js';
import User from './user.js';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const { DB_FORCE } = process.env;

export default (sequelize) => {
    const User = UserFunc(sequelize);
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

    Token.sync({ force: DB_FORCE });
    Token.sync({ force: DB_FORCE === 'true' });

        return Token;
};
