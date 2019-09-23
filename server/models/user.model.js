import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        minlength: 3
    },
}, {
    timestamps: true
});

const User = mongoose.model('user', userSchema);
module.exports =  User;