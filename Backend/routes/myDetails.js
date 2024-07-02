const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/get/my/details', passport.authenticate('jwt', {session: false}), async function (req,res) {
    const userId = req.user._id;

    const user = await User.findOne({_id: userId});

    if(!user){
        return res.status(404).json({err: 'not found'});
    }

    return res.status(200).json({data: user});
});

module.exports = router;