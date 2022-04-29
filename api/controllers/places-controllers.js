import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error.js';
import getCoordsForAddress from '../util/location.js';

let DUMMY_PLACES = [
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

    const place = DUMMY_PLACES.find((place) => place.id === placeId);

    if(!place) {
        throw new HttpError('Could not find a place for the provided id', 404);
    }

    res.json({place})
}

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const places = DUMMY_PLACES.filter((user) => user.creator === userId);

    if(!places || places.length === 0) {
        return next(new HttpError('Could not find places for the provided user id', 404));
    }

    res.json({places})
}

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);  // this runs validation middleware function 
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid input passed, please check your data', 422));
    }

    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address)
    } catch (error) {
        return next(error)
    }
    

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

const updatePlace = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError('Invalid input passed, please check your data', 422);
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    const updatedPlace = { ...DUMMY_PLACES.find((place) => place.id === placeId) };
    const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace})
}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if(!DUMMY_PLACES.find((place) => place.id === placeId)) {
        throw new HttpError('Could not a find a place for that id', 404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter((place) => place.id !== placeId);

    res.status(200).json({message: 'Deleted place!'})
}

export {
    getPlaceById,
    getPlacesByUserId,
    createPlace,
    updatePlace,
    deletePlace
}