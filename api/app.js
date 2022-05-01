import express from 'express';
import mongoose from 'mongoose';

import placesRoutes from './routes/places-routes.js';  // it is kind of a middleware, so we can use it with app.use()
import usersRoutes from './routes/users-routes.js';
import HttpError from './models/http-error.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/places' ,placesRoutes);   // => localhost:3000/api/places/...
app.use('/api/users' ,usersRoutes);   // => localhost:3000/api/users/...


// if it doesn't match any route
app.use((req, res, next) => {
    const error = new HttpError('Could not found this route!', 404);
    throw error;
})

// Triggered if there is an error in the routes
app.use((error, req, res, next) => {
    if(res.headersSent) {
        return next(error)
    }

    res.status(error.code || 500);
    res.json({
        message: error.message || 'An unknown error occured!'
    })
})

mongoose.connect(`mongodb+srv://mern-mustafa1:mernmustafa1@cluster0.kn0oc.mongodb.net/places?retryWrites=true&w=majority`)
.then(() => {
    app.listen(port, () => {
        console.log(`Server is up on port ${port}`)
      })
})
.catch((err) => {
    console.log(err)
})
