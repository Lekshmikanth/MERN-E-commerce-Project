const express = require('express');
const multer = require('multer');
const Category = require('../models/category')
const router = express.Router();
const path = require('path');

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

const upload = multer({ storage: storage });

// Create category
router.post('/add', upload.single('image'), async (req, res) => {
    const { name } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;  // Use the file path to store in DB

    if ( !name || !imagePath) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const category = new Category({ name, image: imagePath });
    await category.save();
    res.status(201).json(category);
});

// Update
router.put('/:id', upload.single('image'), async (req, res) => {
    const { name } = req.body;
    let imagePath = req.body.image;  // If no new image, keep the old one

    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;  // If a new image is uploaded, update the image path
    }

    const updateData = { name, image: imagePath };
    const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(category);
});

// Delete
router.delete('/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

// List all
router.get('/', async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

module.exports = router;
