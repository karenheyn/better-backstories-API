const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const paymentIntent = await stripe.paymentIntents.create({
//   amount: 1099,
//   currency: "usd",
//   // Verify your integration in this guide by including this parameter
//   metadata: { integration_check: "accept_a_payment" },
// });

router.get("/", async (req, res) => {
  const intent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
  });
  res.json({ client_secret: intent.client_secret }); // ... Fetch or create the PaymentIntent
});

module.exports = router;
