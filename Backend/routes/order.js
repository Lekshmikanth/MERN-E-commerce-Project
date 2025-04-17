const express = require('express');
const Cart = require('../models/cart');
const Order = require('../models/order');
const router = express.Router();

// Place order from cart
router.post('/from-cart/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Get the user's cart
        const cart = await Cart.findOne({ user: userId });
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Create new order
        const newOrder = new Order({
            user: userId,
            products: cart.products,
        });

        await newOrder.save();

        // Clear the cart after ordering
        cart.products = [];
        await cart.save();

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Failed to place order', error });
    }
});

// Get all orders for a user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ user: userId }).populate('products.product');
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: 'Failed to fetch orders', error });
    }
});

module.exports = router;
