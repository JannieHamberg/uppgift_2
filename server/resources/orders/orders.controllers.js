const express = require('express');
const fs = require('fs').promises;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const saveOrder = async (orderData) => {
    try {
        const data = await fs.readFile('./data/orders.json');
        const orders = JSON.parse(data);

        orderData.orderDate = new Date().toISOString();

        orders.push(orderData);

        await fs.writeFile('./data/orders.json', JSON.stringify(orders, null, 2));
        
    } catch (err) {
        console.error(err);
    } 
};

const verifySession =  async (req, res) => {
    const { sessionId } = req.query;
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const orderData = {
            sessionId: session.id,
            orderDate: new Date().toISOString(),
            paymentStatus: session.payment_status,
            paymentMethod: session.payment_method,
            paymentId: session.payment_intent,
            customer: session.customer,
            orderItems: session.display_items || session.line_items,
            total: session.amount_total,
            currency: session.currency
        };
        await saveOrder(orderData);
        res.json({ order: orderData });
        res.status(200).json({ message: 'Order sparad', orderData });
    } catch (error) {
        console.error(error);
        res.status(400).send(`Fel i hämtning av orderdata: ${error.message}`);
    }
};

module.exports = { verifySession, saveOrder };
