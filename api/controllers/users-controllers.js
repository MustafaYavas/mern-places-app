import { validationResult } from 'express-validator';

import HttpError from '../models/http-error.js';
import User from '../models/user.js';

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (err) {
        const error = new HttpError('Fetching users failed, please try again!', 500);
        return next(error);
    }
    
    res.json({ users: users });
}

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(new HttpError('Invalid input passed, please check your data', 422));
    }

    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again later!', 500);
        return next(error);
    }

    if(existingUser) {
        const error = new HttpError('User already exist, please login instead', 422);
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        image: 'https://cdn.iconscout.com/icon/free/png-256/profile-287-460516.png',
        password,
        places: []
    })

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Something went wrong while signing up, please try again!', 500);
        return next(error);
    }

    res.status(201).json({user: createdUser});
}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError('Logging in failed, please try again later!', 500);
        return next(error);
    }
    
    if(!existingUser || existingUser.password !== password) {
        const error = new HttpError('Invalid credentials, could not log you in', 401);
        return next(error);
    }
    
    res.json({message: 'Logged in!'});
}

export {
    getUsers,
    signup,
    login
}