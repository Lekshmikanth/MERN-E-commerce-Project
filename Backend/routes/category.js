const express = require('express');
const Category = require('../models/category');
const upload = require('../imageUpload');
const mongoose = require('mongoose');

module.exports = (bucket) => {
    const router = express.Router();

    // ✅ Create Category
    router.post('/add', upload.single('image'), async (req, res) => {
        const { name } = req.body;
        const imagePath = req.file ? req.file.filename : null;

        if (!name || !imagePath) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        try {
            const category = new Category({ name, image: imagePath });
            await category.save();
            res.status(201).json({ message: 'Category added successfully', category });
        } catch (error) {
            res.status(400).json({ message: 'Failed to add category', error });
        }
    });

    // ✅ Update Category with image cleanup
    router.put('/:id', upload.single('image'), async (req, res) => {
        const { name } = req.body;
        let newImagePath = req.body.image;

        try {
            const existingCategory = await Category.findById(req.params.id);
            if (!existingCategory) return res.status(404).json({ message: 'Category not found' });

            if (req.file) {
                newImagePath = req.file.filename;

                // 🔥 Delete old image from GridFS
                const oldFile = await mongoose.connection.db
                    .collection('productImages.files')
                    .findOne({ filename: existingCategory.image });

                if (oldFile) {
                    await bucket.delete(oldFile._id);
                }
            }

            const updatedCategory = await Category.findByIdAndUpdate(
                req.params.id,
                { name, image: newImagePath },
                { new: true }
            );

            res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
        } catch (error) {
            res.status(400).json({ message: 'Failed to update category', error });
        }
    });

    // ✅ Delete Category with image cleanup
    router.delete('/:id', async (req, res) => {
        try {
            const category = await Category.findByIdAndDelete(req.params.id);
            if (!category) return res.status(404).json({ message: 'Category not found' });

            const filename = category.image;

            if (filename) {
                const file = await mongoose.connection.db
                    .collection('productImages.files')
                    .findOne({ filename });

                if (file) {
                    await bucket.delete(file._id);
                }
            }

            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Failed to delete category', error });
        }
    });

    // ✅ Get All Categories
    router.get('/', async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(400).json({ message: 'Failed to retrieve categories', error });
        }
    });

    return router;
};
