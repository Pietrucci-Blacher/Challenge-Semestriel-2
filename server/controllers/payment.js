import * as PaymentService from '../services/payment.js';

export const verifyPayment = async (req, res) => {
    try {
        const { paymentIntent } = req.body;

        console.log(paymentIntent);
        const paymentId = paymentIntent.id;
        console.log(paymentId);
        const newPayment = await PaymentService.create({

            paymentId,

        });

        res.json({ message: 'Payment successful', payment: newPayment });
    } catch (error) {
        res.status(500).json(error);
        res.status(500).json({ error: error.message });
    }
};
