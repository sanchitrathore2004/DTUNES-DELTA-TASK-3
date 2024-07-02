const express = require('express');
const router = express.Router();
const Playlist = require('../models/playlist');
const passport = require('passport');
const User = require('../models/user');
const Song = require('../models/songs');
const circularJson = require('circular-json');

router.post('/create', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const currentUser = req.user;
    const {name, thumbnail} = req.body;

    if(!name){
        return res.status(201).json({err: 'Insufficient Data'});
    }

    const playlistData = {
        name,
        thumbnail,
        owner: currentUser._id,
        collaborators: [],
    }; 

    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
});

router.get('/get/playlist/:playlistId', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const playlistId = req.params.playlistId;

    const playlist = await Playlist.findOne({_id: playlistId}).populate({
        path: "songs",
        populate: {
            path: "artist",
        },
    });

    if(!playlist){
        return res.status(201).json({err: 'No Playlist Found'});
    }

    return res.status(200).json(playlist);
});

router.get('/get/my/playlist', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const userId = req.user._id;
    if(!userId){
        return res.status(201).json({err: 'Invalid user ID'});
    }
    const playlist = await Playlist.find({owner: req.user._id}).populate("owner");
    return res.status(200).json({data: playlist});
});

router.post('/add/song', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const currentUserId = req.user._id;
    const {playlistId, songId} = req.body;

    const playlist = await Playlist.findOne({_id: playlistId});
    if(!playlist){
        return res.status(201).json({err: 'Playlist does not exist'});
    }

    if(!playlist.owner.equals(currentUserId) && !playlist.collaborators.includes(currentUserId)){
        return res.status(201).json({err: 'Not Allowed'});
    }

    const song = await Song.findOne({_id: songId});
    if(!song){
        return res.status(201).json({err: 'Song does not exist'});
    }

    playlist.songs.push(songId);
    await playlist.save();

    return res.status(200).json(playlist);
});

module.exports = router;