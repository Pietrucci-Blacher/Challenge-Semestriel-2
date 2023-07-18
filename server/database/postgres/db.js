import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const {
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    MODE,
    MODE_SERV,
} = process.env;
let connection;

if (MODE === 'test') {
    connection = new Sequelize('sqlite::memory:', {
        logging: false,
    });
} else {
    let connectionOptions = {
        host: POSTGRES_HOST,
        dialect: 'postgres',
        logging: false,
    };

    if (MODE_SERV === 'prod') {
        connectionOptions.ssl = true;
        connectionOptions.dialectOptions = {
            ssl: {
                require: true,
            },
        };
    }
    connection = new Sequelize(
        POSTGRES_DB,
        POSTGRES_USER,
        POSTGRES_PASSWORD,
        connectionOptions,
    );
}

try {
    await connection.authenticate();
    console.log('Connected to postgres');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default connection;
