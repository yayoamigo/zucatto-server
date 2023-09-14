const router = require("express").Router();
const KEY = "sk_test_51Mod09LrxFSQiNWmT2XcDQmrKVt0K4tumtpUgAJjT6LdvNOlK55sU38LoID1IVtNyOdzRttZ6JT2zW08NzbV4hof00wvLL90HY"
const stripe = require("stripe")(KEY);

router.post("/payment", (req, res) => {
  console.log('Request body:', req.body);
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.error('Stripe error:', stripeErr);
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;