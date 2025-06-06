// routes/cart.js
const express = require('express');
const Cart = require('../models/cart');
const Product = require('../models/product');
const router = express.Router();
const mongoose = require('mongoose');

// Add to Cart
router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

        const existingProduct = cart.products.find(p => p.product.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        res.status(400).json({ message: 'Failed to add product to cart', error });
    }
});

// Get all cart items for a user
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ user: new mongoose.Types.ObjectId(userId) }).populate('products.product');
        if (!cart) {
            return res.status(200).json({ products: [] }); // empty cart fallback
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: 'Failed to fetch cart', error });
    }
});


// Remove from Cart
router.delete('/delete', async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.products = cart.products.filter(p => p.product.toString() !== productId);

        await cart.save();
        res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        res.status(400).json({ message: 'Failed to remove product from cart', error });
    }
});

module.exports = router;
