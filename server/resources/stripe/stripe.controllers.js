/* const initStripe = require("../../stripe"); */
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const checkout = async (req, res) => {
/*     if (!req.session.user) {
   
        return res.status(401).json({ error: 'You must be logged in to place an order.' });
    } */
  try {
    const cart = req.body.cart
    console.log('Cart received:', JSON.stringify(cart, null, 2));

    /* const stripe = initStripe() */
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: req.session.user.stripeCustomerId,
      line_items: cart.map((item) => ({
        price_data: {
          currency: "sek",
          product_data: {
            name: item.product.name
          },
          unit_amount: item.product.default_price.unit_amount,
        },
        quantity: item.quantity
      })),
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/"
    })

    if (!session) {
      return res.status(400).json("Something went wrong")
    }
    /* res.json({ url: session.url, sessionId: session.id }); */
    res.redirect(303, session.url);
  } catch (err) {
    console.log(err)
    res.status(400).json(err.message)
  }
}

module.exports = { checkout }