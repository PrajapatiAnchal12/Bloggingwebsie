import express from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost, bulkDeletePosts, getStats } from '../controllers/postController.js';

const router = express.Router();

router.route('/')
    .get(getPosts)
    .post(createPost);

router.route('/stats')
    .get(getStats);

router.route('/bulk-delete')
    .post(bulkDeletePosts);

router.route('/:id')
    .get(getPostById)
    .put(updatePost)
    .delete(deletePost);

export default router;
