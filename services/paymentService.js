const { name } = require('ejs');
const config = require('../config/config');

const stripe = require('stripe')(config.stripeSecretKey);

async function createCustomer(user) {
    const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
    });

    user.stripeId = customer.id;

    await user.save();

    return customer
}

module.exports = {
    stripe, createCustomer
};