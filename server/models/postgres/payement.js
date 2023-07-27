import { DataTypes, Model } from 'sequelize';
import SkinFunc from './skin.js';

export default (sequelize) => {
    const Skin = SkinFunc(sequelize);
    class Payment extends Model {}

    Payment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            paymentId: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            skinId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Skin,
                    key: 'id',
                },
            },
            priceId: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Payment',
            tableName: 'payment',
            timestamps: true,
        },
    );

    return Payment;
};
