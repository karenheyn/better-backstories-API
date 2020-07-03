const express = require("express");
const router = express.Router();
const endpointSecret = process.env.WEBHOOK_SECRET;
console.log(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

let Intent;
router.post("/", async (req, res) => {
  const session = await stripe.checkout.sessions.create(
    {
      success_url: "http://localhost:8080/#/success",
      cancel_url: "http://localhost:8080/#/cancel",
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1H0up7Kc91wTjOOikyrKImZs",
          quantity: 1,
        },
      ],
      mode: "payment",
    },
    function (err, session) {
      if (err) {
        console.log(err);
        res.status(500).send({ success: false, reason: "session didnt work" });
      } else {
        console.log(session);
        Intent = session.payment_intent;
        console.log(Intent);
        res.json({ session_id: session.id });
        // res.status(200).send({ success: true });
      }
    }
  );
});
router.get("/confirm", async (req, res) => {
  const intentObject = await stripe.paymentIntents.retrieve(Intent, function (
    err,
    paymentIntent
  ) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, reason: "cannot retrieve payment" });
    } else {
      console.log(paymentIntent);
      res.status(200).json({ status: paymentIntent.status });
      setTimeout(() => (intent = ""), 1000000);
    }
  });
});

module.exports = router;
