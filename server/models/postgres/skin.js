import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
    class Skin extends Model {} // Utilisez le nom du modèle que vous souhaitez créer ici (Skin par exemple)

    Skin.init(
        { 
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            priceid: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            }
        },
        {
            sequelize,
            modelName: 'Skin', // Assurez-vous que le nom du modèle ici correspond au nom que vous souhaitez utiliser (Skin par exemple)
            tableName: 'skin',
            timestamps: true,
        },
    );

    return Skin;
};
