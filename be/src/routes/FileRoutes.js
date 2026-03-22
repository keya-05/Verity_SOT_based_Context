import express from 'express';
import { createFile, getExplorerFiles, deleteFile } from '../controllers/FileController.js';

const router = express.Router();

router.post('/add', createFile);
router.delete('/:id', deleteFile);
router.get('/explorer', getExplorerFiles);

export default router;