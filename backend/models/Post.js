import mongoose from 'mongoose';

// Yaha hum define kar rahe hain ki ek Blog Post mein kya kya details hongi
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title likhna compulsory hai
    },
    category: {
        type: String, // Jaise HEALTH, TRAVEL, GADGETS
        required: true,
    },
    categoryColor: {
        type: String, // Example: 'red'
        default: 'red'
    },
    section: {
        type: String, // Example: 'TRENDING', 'LATEST'
    },
    author: {
        type: String,
        required: true,
    },
    image: {
        type: String, // Photo ka URL save hoga
        required: true,
    },
    content: {
        type: String, 
        required: true,
    },
    quote: {
        type: String,
        default: "",
    },
    points: {
        type: [String],
        default: [],
    },
    views: {
        type: Number,
        default: 0, // Shuru mein views 0 rahenge
    },
    commentsCount: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true // Ye apne aap 'createdAt' aur 'updatedAt' date add kar dega
});

const Post = mongoose.model('Post', postSchema);

export default Post;
