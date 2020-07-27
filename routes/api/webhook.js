const express = require("express");
const router = express.Router();
const endpointSecret = process.env.WEBHOOK_SECRET;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require("body-parser");

// Match the raw body to content type application/json
router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("PaymentIntent was successful!");
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        console.log("PaymentMethod was attached to a Customer!");
        break;
      // ... handle other event types
      default:
        // Unexpected event type
        return response.status(400).end();
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);
module.exports = router;

// Match the raw body to content type application/json
// router.post(
//   "/",
//   bodyParser.raw({ type: "application/json" }),
//   (request, response) => {
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret); // NOT WORKING
//     } catch (err) {
//       console.log(request.body);
//       return response.status(400).send(`Webhook Error: ${err.message}`);
//     }
//     // Handle the checkout.session.completed event

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;
//       // Fulfill the purchase...
//       console.log(session);
//     }

//     // Return a response to acknowledge receipt of the event
//     response.json({ received: true });
//   }
// );

// app.post(
//   "/webhook",
//   bodyParser.raw({ type: "application/json" }),
//   (request, response) => {
//     const sig = request.headers["stripe-signature"];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//     } catch (err) {
//       return response.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Handle the checkout.session.completed event
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;

//       // Fulfill the purchase...
//       handleCheckoutSession(session);
//     }

//     // Return a response to acknowledge receipt of the event
//     response.json({ received: true });
//   }
// );

module.exports = router;
