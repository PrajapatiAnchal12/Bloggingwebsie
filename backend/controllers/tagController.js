import Tag from '../models/Tag.js';

// @desc    Get all tags
// @route   GET /api/tags
export const getTags = async (req, res) => {
    try {
        const tags = await Tag.find({}).sort({ name: 1 });
        res.json(tags);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Create a tag
// @route   POST /api/tags
export const createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const tagExists = await Tag.findOne({ name });

        if (tagExists) {
            res.status(400).json({ message: 'Tag already exists' });
            return;
        }

        const tag = await Tag.create({ name });
        res.status(201).json(tag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a tag
// @route   DELETE /api/tags/:id
export const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if (tag) {
            await tag.deleteOne();
            res.json({ message: 'Tag removed' });
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
