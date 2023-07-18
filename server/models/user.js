import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export default (sequelize) => {
    dotenv.config({ path: '../.env' });

    const {
        JWT_ACCESS_SECRET,
        JWT_ACCESS_EXPIRE,
        JWT_REFRESH_SECRET,
        JWT_REFRESH_EXPIRE,
    } = process.env;

    class User extends Model {
        /**
         * check clear password with hashed password
         *
         * @async
         * @param {string} password - clear password
         * @returns {Promise<boolean>} - true if password is correct
         */
        checkPassword(password) {
            return bcrypt.compare(password, this.password);
        }

        /**
         * hash a password
         *
         * @async
         */
        async hashPassword() {
            this.password = await bcrypt.hash(this.password, 10);
        }

        /**
         * generate access token and refresh token
         *
         * @returns {{accessToken: string, refreshToken: string}} - access token and refresh token
         */
        generateToken() {
            const payload = { id: this.id };

            const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
                expiresIn: parseInt(JWT_ACCESS_EXPIRE),
            });
            const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
                expiresIn: parseInt(JWT_REFRESH_EXPIRE),
            });

            return { accessToken, refreshToken };
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
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            role: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: 'user',
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'user',
            timestamps: true,
        },
    );

    return User;
};
