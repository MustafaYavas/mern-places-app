import express from 'express';

import { getPlaceById, getPlacesByUserId, createPlace, updatePlace, deletePlace } from '../controllers/places-controllers.js';

// Use the express.Router class to create modular, mountable route handlers
const router = express.Router();


// Routes
router.get('/:pid', getPlaceById);
router.get('/user/:uid', getPlacesByUserId);
router.post('/', createPlace);
router.patch('/:pid', updatePlace);
router.delete('/:pid', deletePlace);

export default router;