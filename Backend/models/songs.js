const mongoose = require('mongoose');

const Songs = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    track: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    likeCount: {
        type: Number,
        required: true,
        default: 0,
    },
});

const songModel = mongoose.model('Songs', Songs);

module.exports = songModel;