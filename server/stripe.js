const Stripe = require("stripe");
require('dotenv').config();

const initStripe = () => {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error("Stripe API key is missing.");
  }
  return new Stripe(apiKey, {
    apiVersion: "2023-10-16",
  });
};

module.exports = { initStripe };