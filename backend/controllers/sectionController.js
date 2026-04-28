import Section from '../models/Section.js';

// Helper function to create slug
const slugify = (text) => {
    if (!text) return 'section-' + Date.now();
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     
        .replace(/[^\w-]+/g, '')  
        .replace(/--+/g, '-')
        || 'section-' + Date.now(); // Fallback if slug becomes empty
};

// @desc    Add new section
export const addSection = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'Name is required' });

        const slug = slugify(name);
        const sectionExists = await Section.findOne({ $or: [{ name }, { slug }] });

        if (sectionExists) {
            return res.status(400).json({ message: 'A section with this name or slug already exists' });
        }

        const section = await Section.create({ name, slug });
        res.status(201).json(section);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update section
export const updateSection = async (req, res) => {
    try {
        const { name } = req.body;
        const section = await Section.findById(req.params.id);

        if (!section) {
            return res.status(404).json({ message: 'Section not found' });
        }

        if (name && name !== section.name) {
            const slug = slugify(name);
            const duplicate = await Section.findOne({ 
                _id: { $ne: req.params.id }, 
                $or: [{ name }, { slug }] 
            });

            if (duplicate) {
                return res.status(400).json({ message: 'Another section already has this name' });
            }
            section.name = name;
            section.slug = slug;
        }

        const updatedSection = await section.save();
        res.json(updatedSection);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all sections
export const getSections = async (req, res) => {
    try {
        const sections = await Section.find({});
        res.json(sections);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete section
export const deleteSection = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id);
        if (section) {
            await section.deleteOne();
            res.json({ message: 'Section removed' });
        } else {
            res.status(404).json({ message: 'Section not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
