const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('chats', chatSchema);