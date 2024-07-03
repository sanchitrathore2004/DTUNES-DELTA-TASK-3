const mongoose = require('mongoose');

const user = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        private: true,
    },
    likedSongs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Songs",
        }
    ],
    accountType: {
        type: String,
    },
});

const userModel = mongoose.model('User', user);

module.exports = userModel;