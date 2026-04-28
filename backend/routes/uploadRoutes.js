import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpg|jpeg|png|webp/;
        const extname = filetypes.test(file.originalname.toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Images only!');
        }
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        // Convert buffer to base64 to upload to Cloudinary
        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
        
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'blogging_website',
        });

        res.send({
            message: 'Image uploaded beautifully to Cloudinary',
            image: uploadResponse.secure_url
        });
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        res.status(500).json({ message: 'Failed to upload image to Cloudinary' });
    }
});

export default router;
