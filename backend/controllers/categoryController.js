import mongoose from 'mongoose';
import Category from '../models/Category.js';

// Helper function to create slug
const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')  // Remove all non-word chars
        .replace(/--+/g, '-');    // Replace multiple - with single -
};

// @desc    Add new category
// @route   POST /api/categories
export const addCategory = async (req, res) => {
    try {
        const { name, color } = req.body;
        const slug = slugify(name);
        
        const categoryExists = await Category.findOne({ $or: [{ name }, { slug }] });

        if (categoryExists) {
            return res.status(400).json({ message: 'Category name or slug already exists' });
        }

        const category = await Category.create({ name, slug, color });
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update category
// @route   PUT /api/categories/:id
export const updateCategory = async (req, res) => {
    try {
        const { name, color } = req.body;
        const category = await Category.findById(req.params.id);

        if (category) {
            category.name = name || category.name;
            category.color = color || category.color;
            category.slug = name ? slugify(name) : category.slug;

            const updatedCategory = await category.save();
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all categories with post counts
// @route   GET /api/categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        
        // Fetch post counts for each category
        const categoriesWithCounts = await Promise.all(categories.map(async (cat) => {
            const count = await mongoose.model('Post').countDocuments({ category: cat.name });
            return {
                ...cat._doc,
                count: count.toString().padStart(2, '0')
            };
        }));

        res.json(categoriesWithCounts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            await category.deleteOne();
            res.json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
