import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        const error = new HttpError('Could not create user, please try again', 500);
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        image: req.file.path,
        password: hashedPassword,
        places: []
    })

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError('Something went wrong while signing up, please try again!', 500);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            {
                userId: createdUser.id, 
                email: createdUser.email
            }, 
            process.env.JWT_SIGN_KEY,
            {
                expiresIn: '1h'
            }
        )
    } catch (err) {
        const error = new HttpError('Signing up failed, please try again later.', 500);
        return next(error);
    }

    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token });
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
    
    if(!existingUser) {
        const error = new HttpError('Invalid credentials, could not log you in.', 403);
        return next(error);
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        const error = new HttpError('Could not log you in, please check your credentials and try again.', 500);
        return next(error);
    }

    if(!isValidPassword) {
        const error = new HttpError('Invalid credentials, could not log you in.', 403);
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            {
                userId: existingUser.id, 
                email: existingUser.email
            }, 
            'super_secret_do_not_share',
            {
                expiresIn: '1h'
            }
        )
    } catch (err) {
        const error = new HttpError('Logging in failed, please try again later.', 500);
        return next(error);
    }
    
    res.json({
        userId: existingUser.id,
        email: existingUser.email,
        token
    });
}

export {
    getUsers,
    signup,
    login
}