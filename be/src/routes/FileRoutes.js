import express from 'express';
import { createFile, getExplorerData, deleteFile } from '../controllers/FileController.js';

const router = express.Router();

router.post('/add', createFile);
router.get('/explorer', getExplorerData);
router.delete('/:id', deleteFile);

export default router;