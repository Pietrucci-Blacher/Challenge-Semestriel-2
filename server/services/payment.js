import db from '../database/postgres/postgres.js';

const PaymentModel = db.Payment;

export const create = (data) => {
    return PaymentModel.create(data);
};

