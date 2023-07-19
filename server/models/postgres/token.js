import { DataTypes, Model } from 'sequelize';
import UserFunc from './user.js';

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

    return Token;
};
