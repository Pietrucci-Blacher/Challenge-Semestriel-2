import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/postgres.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const { JWT_SECRET } = process.env;

class User extends Model {
    async checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    generateToken() {
        return jwt.sign({ id: this.id }, JWT_SECRET, {
            expiresIn: 3600,
        });
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
        timestamps: true,
    },
);

User.sync();

export default User;
