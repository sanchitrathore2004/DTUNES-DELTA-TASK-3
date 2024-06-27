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
        ref: "user",
    },
});

const songModel = mongoose.model('Songs', Songs);

module.exports = songModel;