import express from 'express';

import { getPlaceById, getPlaceByUserId, createPlace } from '../controllers/places-controllers.js';

// Use the express.Router class to create modular, mountable route handlers
const router = express.Router();


// Routes
router.get('/:pid', getPlaceById);
router.get('/user/:uid', getPlaceByUserId);
router.post('/', createPlace);

export default router;