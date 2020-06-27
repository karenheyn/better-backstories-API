const express = require("express");
const router = express.Router();
const env = require("dotenv").config({ path: "./.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/", function (req, res) {
  console.log(req.body.charge.amount);
  var token_id = req.body.charge.source;
  var purchase_price = req.body.charge.amount;

  //console.log(token.id +"\n"+purchase_price);

  var charge = stripe.charges.create(
    {
      amount: purchase_price, // Amount in cents
      currency: "usd",
      source: token_id,
      description: "Example charge",
    },
    function (err, charge) {
      if (err && err.type === "StripeCardError") {
        // The card has been declined
        res.json({ status: "failure", reason: "card was declined" });
      } else {
        console.log(charge);
        res.json({ status: "success" });
      }
    }
  );
});

module.exports = router;
