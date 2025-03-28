const express = require('express');
const multer = require('multer');  // Import multer for file handling
const Product = require('../models/product');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Multer setup: save images to the 'uploads' folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads');
        cb(null, uploadPath);  // Directory where images will be saved
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Save image with a unique name
    }
});


// Set up multer instance for handling single file uploads with the name 'image'
const upload = multer({ storage: storage });

// Add product route with image upload
router.post('/add', upload.single('image'), async (req, res) => {
    const { name, description, price, quantity } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;  // Use the file path to store in DB

    // Validate required fields
    if (!name || !description || !price || !quantity || !imagePath) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new product with the image path
    const product = new Product({
        name,
        description,
        price,
        quantity,
        image: imagePath  // Save the image path (not the buffer)
    });

    try {
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        res.status(400).json({ message: 'Failed to add product', error });
    }
});

// Edit Product route
router.put('/edit/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;
    let imagePath = req.body.image;  // If no new image, keep the old one

    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;  // If a new image is uploaded, update the image path
    }

    try {
        const product = await Product.findByIdAndUpdate(
            id,
            { name, description, price, quantity, image: imagePath },
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

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
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

module.exports = router;
