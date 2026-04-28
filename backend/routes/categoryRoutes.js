import express from 'express';
const router = express.Router();
import { addCategory, getCategories, deleteCategory, updateCategory } from '../controllers/categoryController.js';

router.route('/')
    .get(getCategories)
    .post(addCategory);

router.route('/:id')
    .put(updateCategory)
    .delete(deleteCategory);

export default router;
