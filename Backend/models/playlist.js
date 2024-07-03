const mongoose = require('mongoose');

const Playlist = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Songs",
        },
    ],
    collaborators: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    ],
    visibility: {
        type: String,
        required: true,
    },
});

const playlistModel = mongoose.model('Playlist', Playlist);

module.exports = playlistModel;