import Post from '../models/Post.js';

// @desc    Create a new post
// @route   POST /api/posts
export const createPost = async (req, res) => {
    try {
        const { title, category, author, image, content, quote, points, categoryColor, section } = req.body;

        const post = new Post({
            title,
            category,
            author,
            image,
            content,
            quote,
            points,
            categoryColor,
            section
        });

        const createdPost = await post.save();
        res.status(201).json(createdPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all posts
// @route   GET /api/posts
export const getPosts = async (req, res) => {
    try {
        const { category, section, sort } = req.query;
        let query = {};

        if (category) query.category = category;
        if (section) query.section = section;

        let sortQuery = { createdAt: -1 };
        if (sort === 'popular') {
            sortQuery = { views: -1 };
        }

        const posts = await Post.find(query).sort(sortQuery);
        res.json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get post by ID
// @route   GET /api/posts/:id
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            post.views += 1;
            await post.save();
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update post
// @route   PUT /api/posts/:id
export const updatePost = async (req, res) => {
    try {
        const { title, category, author, image, content, quote, points, categoryColor, section } = req.body;
        const post = await Post.findById(req.params.id);

        if (post) {
            post.title = title || post.title;
            post.category = category || post.category;
            post.author = author || post.author;
            post.image = image || post.image;
            post.content = content || post.content;
            post.quote = quote !== undefined ? quote : post.quote;
            post.points = points || post.points;
            post.categoryColor = categoryColor || post.categoryColor;
            post.section = section || post.section;

            const updatedPost = await post.save();
            res.json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post) {
            await post.deleteOne();
            res.json({ message: 'Post removed' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete multiple posts
// @route   DELETE /api/posts/bulk-delete
export const bulkDeletePosts = async (req, res) => {
    try {
        const { ids } = req.body;
        await Post.deleteMany({ _id: { $in: ids } });
        res.json({ message: 'Posts deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get Admin Stats
// @route   GET /api/posts/stats
export const getStats = async (req, res) => {
    try {
        const totalPosts = await Post.countDocuments();
        const totalCategories = await mongoose.model('Category').countDocuments();
        const totalSections = await mongoose.model('Section').countDocuments();
        
        const posts = await Post.find({});
        const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);

        res.json({
            totalPosts,
            totalCategories,
            totalSections,
            totalViews
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
