import express from 'express';
import { getAllCameras, addCamera, editCamera, deleteCamera, searchCameras, sortCameras, getTotalMemory } from '../controllers/cameraController.js';

const router = express.Router();

router.get('/', getAllCameras);
router.post('/', addCamera);
router.put('/:id', editCamera);
router.delete('/:id', deleteCamera);
router.get('/search', searchCameras);
router.get('/sort', sortCameras);
router.get('/total-memory', getTotalMemory);

export default router;
