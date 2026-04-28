import express from 'express';
const router = express.Router();
import { addSection, getSections, deleteSection, updateSection } from '../controllers/sectionController.js';

router.route('/')
    .get(getSections)
    .post(addSection);

router.route('/:id')
    .put(updateSection)
    .delete(deleteSection);

export default router;
