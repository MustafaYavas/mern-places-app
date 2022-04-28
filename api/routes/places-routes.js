import express from 'express';

import { getPlaceById, getPlaceByUserId, createPlace } from '../controllers/places-controllers.js';

// Modüler, monte edilebilir route handler'lar oluşturmak için express.Router sınıfını kullanabiliriz.
const router = express.Router();


// Routes
router.get('/:pid', getPlaceById);
router.get('/user/:uid', getPlaceByUserId);
router.post('/', createPlace)

export default router;