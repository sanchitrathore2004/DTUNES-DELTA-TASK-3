const express = require('express');
const passport = require('passport');
const router = express.Router();
const Song = require('../models/songs');
const User = require('../models/user');

router.post('/create', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const {name, thumbnail, track} = req.body;

    if(!name || !thumbnail || !track){
        return res.status(201).json({err: 'Incomplete Details'});
    }

    const artist = req.user._id;
    const songDetails = {name,thumbnail, track, artist};
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
});

router.get('/get/mysongs', passport.authenticate('jwt', {session:false}), async function (req,res) {
    // .populate is used for fetching the complete user data related to some other data
    const songs = await Song.find({artist: req.user._id}).populate("artist");
    return res.status(200).json({data: {songs, artist}});
});

router.get('/get/artist/:artistId', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const {artistId} = req.params.artistId;

    const artist = await User.findOne({_id: artistId});
    if(!artist){
        return res.status(201).json({err: 'Artist does not exist'});
    }

    const songs = await Song.find({artist: artistId});
    return res.status(200).json({data: songs});
});

router.get('/get/songname/:songName', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const {songName} = req.params.songName;

    //pattern name matching try kro 
    //the one used here is exact name matching
    const songs = await Song.find({name: songName});
    return res.status(200).json({data: songs});
});

module.exports = router;