import jwt from 'jsonwebtoken';
import 'dotenv/config';

import HttpError from '../models/http-error.js';

const checkAuth = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
        if(!token) throw new Error('Authentication failed!')
        
        const decodedToken = jwt.verify(token, process.env.JWT_SIGN_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        const error = new HttpError(err, 403);
        return next(error);
    }
}

export default checkAuth;