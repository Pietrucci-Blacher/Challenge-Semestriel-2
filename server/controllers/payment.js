import * as PaymentService from '../services/payment/payment.js';

export const verifyPayment = async (req, res) => {
    try {
        const { paymentIntent } = req.body;

        const newPayment = await PaymentService.create({
            userId: req.user.id,
            date: new Date(),
            amount: paymentIntent.amount,
            status: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            skinId: paymentIntent.metadata.skinId,
            priceId: paymentIntent.metadata.priceId,
        });

        res.json({ message: 'Payment successful', payment: newPayment });
    } catch (error) {
        res.status(500).json({ message: 'Failed to process payment' });
    }
};
