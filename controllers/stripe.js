const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function processPayment(req, res) {

    let paymentIntent = await stripe.paymentIntents.create({
        amount: 1500,
        currency: 'gbp',
        payment_method_types: ['card'],
      });
    if(!paymentIntent){
        res.status(500).send(res)
    } else {
        res.json(paymentIntent.client_secret)
    } 
}


module.exports.processPayment = processPayment