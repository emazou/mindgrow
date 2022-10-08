const axios = require('axios');

const Product = require('../models/Product')

const paymentController = {
    async confirmPayment(req, res) {
        console.log('Payment confirmed', req.query);
        return res.redirect(303, `${process.env.FRONTEND_URL}/payment-success`);
    },
    async failedPayment(req, res) {
        console.log('Payment failed', req.query);
        return res.redirect(303, `${process.env.FRONTEND_URL}/payment-failure`);
    },
    async create(req, res) {
        try {
            const { email } = req.user;
            const { items } = req.body;
            // sacar billing address y agregarlo en payload
            const products = [];
            for (const item of items) {
                const product = await Product.findById(item.id);
                products.push({
                    title: product.name,
                    description: product.description,
                    category_id: product.subcategory,
                    quantity: item.quantity,
                    currency_id: "USD",
                    unit_price: product.price,
                });
            }

            const payload = {
                items: products,
                payer: {
                    email,
                },
                back_urls: {
                    success: `${process.env.BACKEND_URL}/payments/success`,
                    failure: `${process.env.BACKEND_URL}/payments/failure`,
                },
                auto_return: "approved",
            };

            const mercadopagoResponse = await axios.post('https://api.mercadopago.com/checkout/preferences', payload, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            });

            console.log(mercadopagoResponse);
            return res.redirect(303, mercadopagoResponse.data.init_point);
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: true,
                message: 'Failed to create payment'
            })
        }
    },
};

module.exports = paymentController;