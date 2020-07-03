const express = require("express");
const router = express.Router();
const endpointSecret = process.env.WEBHOOK_SECRET;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require("body-parser");

// Match the raw body to content type application/json
app.post(
  "/pay-success",
  bodyParser.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret); // NOT WORKING
    } catch (err) {
      console.log(request.body);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the checkout.session.completed event

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      // Fulfill the purchase...
      console.log(session);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);

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
