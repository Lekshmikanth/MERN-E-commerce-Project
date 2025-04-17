const express = require('express');
const Product = require('../models/product');
const upload = require('../imageUpload');
const mongoose = require('mongoose');

module.exports = (bucket) => {
    const router = express.Router();

    // Add Product
    router.post('/add', upload.single('image'), async (req, res) => {
        const { category, name, description, price, quantity, isTrending } = req.body;
        const imagePath = req.file ? req.file.filename : null;

        if (!category || !name || !description || !price || !quantity || !imagePath) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const product = new Product({
            category,
            name,
            description,
            price,
            quantity,
            image: imagePath,
            isTrending,
        });

        try {
            await product.save();
            res.status(201).json({ message: 'Product added successfully', product });
        } catch (error) {
            res.status(400).json({ message: 'Failed to add product', error });
        }
    });

    // Edit Product
    router.put('/edit/:id', upload.single('image'), async (req, res) => {
        const { id } = req.params;
        const { category, name, description, price, quantity, isTrending } = req.body;

        try {
            const existingProduct = await Product.findById(id);
            if (!existingProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            let newImage = existingProduct.image;
            if (req.file) {
                newImage = req.file.filename;

                // Delete old image from GridFS
                const file = await mongoose.connection.db
                    .collection('productImages.files')
                    .findOne({ filename: existingProduct.image });

                if (file) {
                    await bucket.delete(file._id);
                }
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                { category, name, description, price, quantity, image: newImage, isTrending },
                { new: true }
            );

            res.status(200).json({ message: 'Product updated', product: updatedProduct });
        } catch (error) {
            res.status(400).json({ message: 'Failed to update product', error });
        }
    });

    // Delete Product
    router.delete('/delete/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const product = await Product.findByIdAndDelete(id);
            if (!product) return res.status(404).json({ message: 'Product not found' });

            const filename = product.image;

            if (filename) {
                const file = await mongoose.connection.db
                    .collection('productImages.files')
                    .findOne({ filename });

                if (file) {
                    await bucket.delete(file._id);
                }
            }

            res.status(200).json({ message: 'Product deleted' });
        } catch (error) {
            res.status(400).json({ message: 'Failed to delete product', error });
        }
    });

    // Get All Products
    router.get('/', async (req, res) => {
        const { category, isTrending } = req.query;
        try {
            let query = {};

            if (category) {
                query.category = { $regex: category, $options: 'i' };
            }

            if (isTrending) {
                query.isTrending = isTrending === 'true';
            }

            const products = await Product.find(query);
            res.status(200).json({ products });
        } catch (error) {
            res.status(400).json({ message: 'Failed to retrieve products', error });
        }
    });

    // Get a Single Product by ID
    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ product });
        } catch (error) {
            res.status(400).json({ message: 'Failed to retrieve product', error });
        }
    });

    // Get Image by Filename
    router.get('/image/:filename', async (req, res) => {
        try {
            const fileStream = bucket.openDownloadStreamByName(req.params.filename);
            fileStream.on('error', () => res.status(404).send('Image not found'));
            fileStream.pipe(res);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving image', error });
        }
    });

    return router;
};
