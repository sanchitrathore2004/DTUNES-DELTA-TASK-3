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

    const user = await User.findOne({_id: userId});

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

module.exports = router;