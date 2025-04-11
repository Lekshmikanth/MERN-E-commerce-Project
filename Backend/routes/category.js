const express = require('express');
const multer = require('multer');
const Category = require('../models/category')
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

const upload = multer({ storage: storage });

// Create category
router.post('/add', upload.single('image'), async (req, res) => {
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
