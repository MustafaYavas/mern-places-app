import express from 'express';

import placesRoutes from './routes/places-routes.js';  // it is kind of a middleware, so we can use it with app.use()
// import usersRoutes from './routes/users-routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/places' ,placesRoutes);   // => localhost:3000/api/places/...
// app.use('/api/users' ,usersRoutes);   // => localhost:3000/api/users/...

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

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})