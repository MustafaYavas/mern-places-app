import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 7},
    image: { type: String, required: true },
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }] 
    // ref to Place model
    // [] means we ahve multiple places entries
})

// userSchema.plugin(mongooseUniqueValidator);
userSchema.set('toJSON', { getters: true });

const User = mongoose.model('User', userSchema);
export default User;