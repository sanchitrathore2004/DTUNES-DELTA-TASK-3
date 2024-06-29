const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {getToken} = require('../utils/helper');

router.post('/register', async function (req,res) {
    const {email, password, firstName, lastName, userName} = req.body;

    const user = await User.findOne({email: email });
    if(user){
        return res.status(404).json({error: 'A user with this email already exist'});
    }
    else {
        //here we convert the password plain text to encription so that security issues must be removed
        const hashedPassword = await bcrypt.hash(password,10);
        const newUserData = {email, password: hashedPassword, firstName, lastName, userName};
        const newUser = await User.create(newUserData);
        const token = await getToken(email, newUser); 
        const userToReturn = {...newUser.toJSON(), token};
        delete userToReturn.password;
        return res.status(200).json(userToReturn);
    }
});

router.post('/login', async function (req,res){
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(602).json({err: 'Invalid Email'});
    }
 
    // comparing one password in plain text and other one in the hashed format
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(603).json({err: 'Invalid Password'});
    }

    const token = await getToken(user.email, user); 
    const userToReturn = {...user.toJSON(), token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});


module.exports = router;