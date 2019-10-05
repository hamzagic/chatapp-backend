const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    createdAt: {
        type: String,
        default: Date.now
    },
    updatedAt: {
        type: String,
        default: null
    }
});

userSchema.methods.getUser = function() {
    console.log('user is' + this.username);
}

module.exports = mongoose.model('users', userSchema);