const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const checkout = async (req, res) => {
  try {
    const cart = req.body.cart;
    console.log('Cart received:', JSON.stringify(cart, null, 2));

    // Adjusted to use price IDs directly
    const line_items = cart.map((item) => ({
      price: item.product, // Use the Stripe price ID directly
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: req.session.user.stripeCustomerId,
      line_items: line_items, // Use the adjusted line items
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/"
    });

    if (!session) {
      return res.status(400).json("Something went wrong");
    }

    res.json({ url: session.url });
  } catch (err) {
    console.error('Error in checkout:', err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { checkout };
