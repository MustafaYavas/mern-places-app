import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: { type: Number, required: true},
        long: { type: Number, required: true},
    },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' } // ref to User model
})

// place.toObject -> to get normal js object (mongoose object ==> normal js object)
// getters: true -> _id ==> id
placeSchema.set('toJSON', { getters: true });

const Place = mongoose.model('Place', placeSchema);
export default Place;