// routes/product.js
const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Add Product
router.post('/add', async (req, res) => {
    const { name, description, price, image, category } = req.body;

    const product = new Product({ name, description, price, image, category });

    try {
        await product.save();
        res.status(201).json({ message: 'Product added', product });
    } catch (error) {
        res.status(400).json({ message: 'Failed to add product', error });
    }
});

// Edit Product
router.put('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image, category } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(
            id,
            { name, description, price, image, category },
            { new: true }
        );
        res.status(200).json({ message: 'Product updated', product });
    } catch (error) {
        res.status(400).json({ message: 'Failed to update product', error });
    }
});

// Delete Product
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to delete product', error });
    }
});

module.exports = router;
