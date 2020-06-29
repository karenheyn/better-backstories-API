const express = require("express");
const router = express.Router();
const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", function (req, res) {
  console.log(req.body.charge.amount);
  const token_id = req.body.charge.source;
  const purchase_price = req.body.charge.amount;
  const email = req.body.charge.receipt_email;
  var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
  stripe.charges.create(
    {
      amount: 1000,
      currency: "usd",
      source: "tok_visa",
      description: "My First Test Charge (created for API docs)",
      receipt_email: email,
    },
    function (err, charge) {
      if (err && err.type === "StripeCardError") {
        res.json({ status: "failure", reason: "card was declined" });
      } else {
        console.log(charge);
        res.json({ status: "Success!" });
      }
    }
  );
  //console.log(token.id +"\n"+purchase_price);

  //   stripe.charges.create(
  //     {
  //       amount: purchase_price, // Amount in cents
  //       currency: "usd",
  //       source: token_id,
  //       description: "Example charge",
  //     },
  //     function (err, charge) {
  //       if (err && err.type === "StripeCardError") {
  //         // The card has been declined
  //         res.json({ status: "failure", reason: "card was declined" });
  //       } else {
  //         console.log(charge);
  //         res.json({ status: "success" });
  //       }
  //     }
  //   );
});

module.exports = router;
