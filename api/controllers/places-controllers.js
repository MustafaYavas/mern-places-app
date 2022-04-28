import HttpError from '../models/http-error.js';
import { v4 as uuidv4 } from 'uuid';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the World!',
        location: {
            lat: 40.7484474,
            long: -73.9871516
        },
        address: '20 W 34th St,New York, NY 10001',
        creator: 'u1'
    }
]

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;

    const place = DUMMY_PLACES.find((place) => place.id===placeId);

    if(!place) {
        throw new HttpError('Could not find a place for the provided id', 404);
    }

    res.json({place})
}

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const user = DUMMY_PLACES.find((user) => user.creator===userId);

    if(!user) {
        return next(new HttpError('Could not find a place for the provided user id', 404));
    }

    res.json({user})
}

const createPlace = (req, res, nex) => {
    const { title, description, coordinates, address, creator } = req.body;

    const createdPlace = {
        id: uuidv4(),
        title,
        description,
        location: coordinates,
        address,
        creator
    }

    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({place: createdPlace})
}

export {
    getPlaceById,
    getPlaceByUserId,
    createPlace
}