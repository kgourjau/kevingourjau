// import {loadStripe} from '@stripe/stripe';
//
// import '@stripe/stripe-js'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = require('stripe')('sk_test_51ITSrWL9S0DFFoIRJQ0ClcID2vnUjPToLQh6f6zP4WlSAFYe8F55PHnhntPazsc0uGLP8onvuodPvlAbFrTnqO0w00c2mwREji');
// const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');


export default async function s(req, res) {
    try {

        const paymentIntent = await stripePromise.paymentIntents.create({
            amount: 1099,
            currency: 'eur',
            // Verify your integration in this guide by including this parameter
            // metadata: {integration_check: 'accept_a_payment'},

            payment_method_types: ['card'],
            setup_future_usage: 'off_session',
        });
        res.json({client_secret: paymentIntent.client_secret});
    } catch (error) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
    }
}