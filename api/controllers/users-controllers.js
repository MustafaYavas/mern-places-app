import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-error.js';

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Mustafa Yavaş',
        email: 'test@test.com',
        password: 'test123'
    }
]

const getUsers = (req, res, send) => {
    res.json({ users: DUMMY_USERS })
}

const signup = (req, res, send) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError('Invalid input passed, please check your data', 422);
    }

    const { name, email, password } = req.body;

    const hasUser = DUMMY_USERS.find((user) => user.email === email);
    if(hasUser) {
        throw new HttpError('Could not create user, email already exists', 401);
    }

    const createdUser = {
        id: uuidv4(),
        name,
        email,
        password
    }

    DUMMY_USERS.push(createdUser);

    res.status(201).json({user: createdUser});
}

const login = (req, res, send) => {
    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find((user) => user.email === email);
    if(!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not identify user, credentials seem to be wrong', 401);
    }
    
    res.json({message: 'Logged in!'});
}

export {
    getUsers,
    signup,
    login
}