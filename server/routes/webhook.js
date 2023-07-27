import { Router } from 'express';
import { Stripe } from 'stripe'; 


const stripe = new Stripe('sk_test_51NHLQLJ6Q5BZS72K99joHvJ537PvVahcyO5kWV59YmG5m0L6YQjk9mvQNRPqpK7oj6iujWfxTSN2v0mRMNBj23YJ00OrtKr1dW');
const endpointSecret = 'whsec_04751b2b922052cd892953ae38a806a6404654f2828473429fd97edb96012f03';
const router = new Router();

// router.post('/create-payment-intent', async (req, res) => {
//   const skinId = req.body.skinId;


//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: 1000,
//       currency: 'eur',
//       client_reference_id: {
//         skinId: skinId,
//       },
//     });

//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error('Erreur lors de la création du PaymentIntent :', error);
//     res.status(500).json({ error: 'Une erreur est survenue lors de la création du paiement.' });
//   }
// });


router.post('/webhook', async (req, res) => {
  const payload = req.body;
  const sig = req.headers['stripe-signature'];

  console.log('payload', payload);
  console.log('sig', sig);

  try {
    const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    let paymentId;
    let amount;
    let status;

    let userId;
    let skinId;
    let priceId;

    switch (event.type) {
      case 'checkout.session.completed':
        const sessionId = event.data.object.id;
        console.log('Paiement complété pour la session:', sessionId);
        break;
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('Paiement réussi:');
        console.log(paymentIntent);

        paymentId = paymentIntent.id;
        amount = paymentIntent.amount;
        status = paymentIntent.status;

        userId = req.body.userId;
        skinId = req.body.skinId;
        priceId = req.body.priceId;

        // await PaymentService.create({
        //   paymentId,
        //   userId,
        //   amount,
        //   status: true,
        //   skinId: paymentIntent.metadata.skinId,
        //   priceId: paymentIntent.metadata.priceId,
        // });


        console.log('paymentId', paymentId);
        console.log('amount', amount);
        console.log('status', status);
        console.log('userId', userId);
        console.log('skinId', skinId);
        console.log('priceId', priceId);
        console.log(req.body);

        break;
      default:
        console.log('Événement non géré:', event.type);
    }
    res.sendStatus(200);
  } 
  catch (error) {
    console.error('Erreur lors du traitement de l\'événement du webhook:', error);
    res.sendStatus(400);
  }
});

export default router;
