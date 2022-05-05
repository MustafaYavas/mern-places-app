import jwt from 'jsonwebtoken';

import HttpError from '../models/http-error.js';

const checkAuth = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
        if(!token) throw new Error('Authentication failed!')
        
        const decodedToken = jwt.verify(token, 'super_secret_do_not_share');
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        const error = new HttpError(err, 403);
        return next(error);
    }
}

export default checkAuth;