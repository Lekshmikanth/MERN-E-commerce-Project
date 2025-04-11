const express = require('express');
const multer = require('multer');
const Category = require('../models/category')
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Create category
router.post('/', upload.single('image'), async (req, res) => {
    const { name } = req.body;
    const image = req.file?.path;
    const category = new Category({ name, image });
    await category.save();
    res.status(201).json(category);
});

// Update
router.put('/:id', upload.single('image'), async (req, res) => {
    const { name } = req.body;
    const updateData = { name };
    if (req.file) updateData.image = req.file.path;
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
