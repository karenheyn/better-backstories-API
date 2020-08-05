const express = require("express");
const router = express.Router();
const endpointSecret = process.env.WEBHOOK_SECRET;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// bundle price_1H9el6Kc91wTjOOiod2zfvtf
//bundle w box price_1H9empKc91wTjOOi15BO1q05
// booster price_1H9enxKc91wTjOOi8Jjy0HnX

router.post("/", async (req, res) => {
  console.log(req.body.product);
  switch (req.body.product.name) {
    case "Basic Deck":
      amount = "price_1HCaZEK8COtkBsd0qtofdMoN";
      break;
    case "Card Bundle":
      amount = "price_1HCaZ8K8COtkBsd0HqwWq9U9";
      break;
    case "Full Bundle with Box":
      amount = "price_1HCaYsK8COtkBsd0j5hj2kce";
      break;
    case "Technical Booster":
      amount = "price_1HCEQnK8COtkBsd0lnBit6DY";
      break;
    default:
      amount = "price_1HCaYjK8COtkBsd0UnJwQV3B";
  }
  const session = await stripe.checkout.sessions.create(
    {
      success_url: "http://localhost:8080/success",
      cancel_url: "http://localhost:8080/cancel",
      payment_method_types: ["card"],
      line_items: [
        {
          price: amount,
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
        res.status(200).json({
          session_id: session.id,
          intent: Intent,
          item: req.body.product.name,
        });
      }
    }
  );
});
router.post("/confirm", async (req, res) => {
  let intent = req.body.intent;

  const intentObject = await stripe.paymentIntents.retrieve(intent, function (
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

      // setTimeout(() => (intent = ""), 10);
    }
  });
});

module.exports = router;
