const express = require('express');
const passport = require('passport');
const router = express.Router();
const Song = require('../models/songs');
const User = require('../models/user');
const { findOne } = require('../models/playlist');

router.post('/create', passport.authenticate('jwt', {session: false}), async function (req,res) {
    let {name, thumbnail, track, lyrics, artistName, tags, genre} = req.body;

    if(!name || !thumbnail || !track || !lyrics || !artistName || !genre){
        return res.status(201).json({err: 'Incomplete Details'});
    }

    const artist = req.user._id;
    const songDetails = {name,thumbnail, track, artist, lyrics, artistName, tags, genre};
    const createdSong = await Song.create(songDetails);
    createdSong.timestamp = new Date();
    createdSong.save();
    return res.status(200).json(createdSong);
});

router.get('/get/mysongs', passport.authenticate('jwt', {session:false}), async function (req,res) {
    // .populate is used for fetching the complete user data related to some other data
    const songs = await Song.find({artist: req.user._id}).populate("artist");
    if(!songs){
        return res.status(401).json({err: 'not found'});
    }
    return res.status(200).json({data: {songs}});
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
    // you have to write only req.params if you want to fetch anything from the route important to remember
    let {songName} = req.params;

    //pattern name matching try kro 
    //the one used here is exact name matching
    const songs = await Song.find({name: {$regex: songName, $options: 'i'}}).populate("artist");
    return res.status(200).json({data: songs});
});

router.get('/like/song/:songId', passport.authenticate('jwt', {session:false}), async function (req,res) {
    const songId = req.params.songId;
    const userId = req.user._id;

    const song = await Song.findOne({_id: songId});

    if(!song){
        return res.status(404).json({err: 'not found'});
    }

    const user = await User.findOne({_id: userId});
    if(user.likedSongs.includes(songId)){
        return res.status(200).json({data: 'already liked'});
    }
    user.likedSongs.push(songId);
    await user.save();
    song.likeCount+=1;
    await song.save();
    return res.status(200).json({data: song});
});

router.get('/get/my/liked/songs', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const userId = req.user._id;

    const user = await User.findOne({_id: userId});

    if(!user){
        return res.status(404).json({err: 'not found'});
    }

    return res.status(200).json({data: user});
});

router.get('/get/songs/from/api/:q', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const query = req.params.q;

    const response = await fetch(`https://v1.nocodeapi.com/sanchit0610/spotify/nGprlezEVcXvcxuT/search
?q=${query}`);

    if(!response){
        return res.status(404).json({err: 'error not found'});
    }

    return res.status(200).json(response);

});

router.get('/dislike/song/:songId', passport.authenticate('jwt', {session:false}), async function (req,res) {
    const songId = req.params.songId;
    const userId = req.user._id;

    const song = await Song.findOne({_id: songId});

    if(!song){
        return res.status(404).json({err: 'not found'});
    }

    const user = await User.findOne({_id: userId});
    
    user.likedSongs.remove(songId);
    await user.save();
    song.likeCount-=1;
    await song.save();
    return res.status(200).json({data: song});
});

router.get('/get/all/songs', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const songs = await Song.find();
    return res.status(200).json({data: songs});
});

module.exports = router;