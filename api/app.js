import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

import placesRoutes from './routes/places-routes.js';  // it is kind of a middleware, so we can use it with app.use()
import usersRoutes from './routes/users-routes.js';
import HttpError from './models/http-error.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// to prevent the CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

app.use('/api/places', placesRoutes);   // => localhost:5000/api/places/...
app.use('/api/users', usersRoutes);   // => localhost:5000/api/users/...


// if it doesn't match any route
app.use((req, res, next) => {
    const error = new HttpError('Could not found this route!', 404);
    throw error;
})

// Triggered if there is an error in the routes
app.use((error, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
            console.log(err); 
        })
    }
    if(res.headersSent) {
        return next(error)
    }

    res.status(error.code || 500);
    res.json({
        message: error.message || 'An unknown error occured!'
    })
})

mongoose.connect(process.env.MONGO_CONNECT_STRING)
.then(() => {
    app.listen(port, () => {
        console.log(`Server is up on port ${port}`)
      })
})
.catch((err) => {
    console.log(err)
})
