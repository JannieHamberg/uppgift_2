const { initStripe } = require("../../stripe");

const fs = require("fs").promises;

const createCheckoutSession = async (req, res) => {
  try {
    console.log(req.body.cart); 
    const cartItems = req.body.cart;
    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ error: "Cart items are missing or not an array." });
    }
    console.log(cartItems);
    const stripe = initStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer: req.session.user.stripeCustomerId,
      
      line_items: cartItems.map((item) => {
        return {
          quantity: item.quantity,
          price: item.product
        };
      }),
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.status(200).json({ url: session.url, session_id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};

const verifySession = async (req, res) => {
  const stripe = initStripe();
  const session_id = req.body.session_id;

  console.log("Received session ID:", session_id);
  

  const session = await stripe.checkout.sessions.retrieve(session_id);

  console.log("Stripe session retrieved:", session); 
  if (typeof session !== 'string') {
    res.status(400).json({ error: 'Session ID is undefined or not a string.' });
    return;
  }

  if (session.payment_status === "paid") {
    const lineItems = await stripe.checkout.sessions.listLineItems(session_id);

    console.log("Line items:", lineItems.data);

    const order = {
      orderNumber: Math.floor(Math.random() * 10000000),
      customerId: session.customer_details.id,
      customerName: session.customer_details.name,

      products: lineItems.data,
      total: session.amount_total,
      date: new Date(),
    };

    console.log("Order created:", order);


    const orders = JSON.parse(await fs.readFile("./data/orders.json"));
    orders.push(order);
    await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 4));
  }

  res.status(200).json({ verified: true });
};

module.exports = { createCheckoutSession, verifySession };