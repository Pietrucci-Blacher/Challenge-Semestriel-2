import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD } = process.env;

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
});

try {
    await sequelize.authenticate();
    console.log('Connected to postgres');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;