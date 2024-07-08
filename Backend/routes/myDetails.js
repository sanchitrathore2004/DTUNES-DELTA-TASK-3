const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/get/my/details', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const userId = req.user._id;

    const user = await User.findOne({_id: userId}).populate("inbox").populate("friends");

    if(!user){ 
        return res.status(404).json({err: 'not found'});
    }
    
    return res.status(200).json({data: user}); 
});

router.get('/get/my/details/only', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const userId = req.user._id;

    const user = await User.findOne({_id: userId}).populate({
        path: "friends",
        populate: {
            path: "liveUpdate",
            populate: {
                path: "songId",
            },
        },
    });

    if(!user){ 
        return res.status(404).json({err: 'not found'});
    }
    
    return res.status(200).json({data: user}); 
});

router.get('/get/my/details/:name', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const userId = req.user._id;
    const firstName = req.params.name;

    const user = await User.find({firstName: {$regex: firstName, $options: 'i'}}); // for making search case insensiticve

    if(!user){ 
        return res.status(404).json({err: 'not found'});
    }
    
    return res.status(200).json({data: user}); 
});

router.get('/get/my/liked/song', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const userId = req.user._id;

    const user = await User.findOne({_id: userId}).populate({
        path: 'likedSongs',
        populate: {
            path: 'artist',
        },
    });

    if(!user){ 
        return res.status(404).json({err: 'not found'});
    }
    
    return res.status(200).json({data: user}); 
});

router.post('/send/request', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const requestId = req.body.requestId;

    const user = await User.findOne({_id: requestId});

    if(!user){
        return res.status(404).json({err: 'not found'});
    }

    user.inbox.push(req.user._id);
    user.save();

    const currentUser = await User.findOne({_id: req.user._id});
    
    currentUser.sent.push(requestId);
    currentUser.save();

    return res.status(200).json({to: user, from: currentUser});
});

router.post('/accept/request', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const friendId = req.body.friendId;

    const sendingUser = await User.findOne({_id: friendId});

    if(!sendingUser){
        return res.status(404).json({err: 'not found'});
    }

    const user = await User.findOne({_id: req.user._id});

    if(!user){
        return res.status(404).json({err: 'not found'});
    }
    sendingUser.friends.push(req.user._id);
    sendingUser.save();

    user.friends.push(friendId);
    user.save();

    return res.status(200).json({data: user});
});

router.get('/get/user/by/:id', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const userId = req.params.id;

    const user = await User.findOne({_id: userId});

    if(!user){
        return res.status(404).json({err: 'not found'});
    }

    return res.status(200).json({data: user});
});

router.post('/save/live/song', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const songId = req.body.songId;

    const user = await User.findOne({_id: req.user._id});

    if(!user){
        return res.status(404).json({err: 'not found'});
    }

    user.liveUpdate = {
        songId: songId, 
        timestamp: new Date(),
    };

    user.playbackHistory.push({
        songId: songId,
        timestamp: new Date(),
    });

    await user.save();

    return res.status(200).json({data: user});
});

router.get('/get/playback/history', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const userId = req.user._id;

        // Calculate the date for one week ago
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        // Query the user's playback history for the past week
        const user = await User.findOne({
            _id: userId,
            'playbackHistory.timestamp': { $gte: oneWeekAgo }
        }, {
            'playbackHistory.$': 1 // Project only the matching playbackHistory entries
        }).populate('playbackHistory.songId'); // Populate song details if necessary

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Filter the playbackHistory array to include only entries within the past week
        const history = user.playbackHistory.filter(entry => entry.timestamp >= oneWeekAgo);

        return res.status(200).json({ data: history });
});

module.exports = router;