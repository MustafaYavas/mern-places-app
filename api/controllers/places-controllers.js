import { validationResult } from 'express-validator';

import HttpError from '../models/http-error.js';
import getCoordsForAddress from '../util/location.js';
import Place from '../models/place.js';
import User from '../models/user.js';
import mongoose from 'mongoose';


const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find place!', 500);
        return next(error);
    }
    
    if(!place) {
        const error = new HttpError('Could not find a place for the provided id', 404);
        return next(error);
    }

    res.json({ place });        
}

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let places
    try {
        places = await Place.find({ creator: userId });
    } catch (err) {
        const error = new HttpError('Something went wrong, fetching places failed!', 500);
        return next(error);
    }

    if(!places || places.length === 0) {
        return next(new HttpError('Could not find places for the provided user id', 404));
    }

    // res.json({places: places.map(place => place.toObject({getters: true}))})
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
    
    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        creator
    })

    let user;
    try {
        user = await User.findById(creator)
    } catch (err) {
        const error = new HttpError('Creating place failed, please try again', 500);
        return next(error);
    }

    if(!user) {
        const error = new HttpError('Could not find user fror provided id', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess });
        user.places.push(createdPlace);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Could not create a new place!', 500);
        return next(error);
    }

    res.status(201).json({place: createdPlace})
}

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(new HttpError('Invalid input passed, please check your data', 422));
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not be updated', 500);
        return next(error);
    }
    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not be updated', 500);
        return next(error);
    }

    res.status(200).json({place})
}

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;
    
    let place;
    try {
        place = await Place.findById(placeId).populate('creator');
    } catch (err) {
        const error = new HttpError('Something went wrong, could not be found', 500);
        return next(error);
    }

    if(!place) {
        const error = new HttpError('Could not find place for this id', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({ session: sess });
        place.creator.places.pull(place);
        await place.creator.save({ session: sess});
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Something went wrong, could not be deleted', 500);
        return next(error);
    }

    res.status(200).json({message: 'Deleted place!'})
}

export {
    getPlaceById,
    getPlacesByUserId,
    createPlace,
    updatePlace,
    deletePlace
}