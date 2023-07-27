import * as PaymentService from '../services/payment/payment.js';

export const verifyPayment = async (req, res) => {
    try {
        const { paymentIntent } = req.body;

        if (!paymentIntent || !paymentIntent.id || !paymentIntent.amount) {
            throw new Error('Invalid payment data');
        }
        const paymentId = paymentIntent.id;
        console.log(paymentId);
        const newPayment = await PaymentService.create({

            paymentId,
            // userId: req.userId,
            // date: new Date(),
            // amount: paymentIntent.amount,
            // status: true,
            // skinId: paymentIntent.metadata.skinId,
            // priceId: paymentIntent.metadata.priceId,

        });

        res.json({ message: 'Payment successful', payment: newPayment });
    } catch (error) {
        // res.status(500).json({ error: 'Failed to process payment' });
        res.status(500).json(error);
        res.status(500).json({ error: error.message });
    }
};
