import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class Payment extends Model {}

    Payment.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
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
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            skinId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Skin',
                    key: 'id',
                },
            },
            priceId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Skin',
                    key: 'id',
                },
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
