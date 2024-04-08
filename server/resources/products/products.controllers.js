require('dotenv').config();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/* const listProducts = async (req, res) => {
    try {
        const products = await stripe.products.list();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json('Serverfel');
    }
} */

const fetchProducts = async (req, res) => {
    try {
        const products = await stripe.products.list({
            expand: ['data.default_price']
        })
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json('Serverfel');
    }
}

module.exports = { fetchProducts }


