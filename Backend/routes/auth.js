const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const axios = require('axios');
const cookieParser = require('cookie-parser');
// const {getToken} = require('../utils/helper');
let access_token = '';

router.use(cookieParser());


const clientId = 'Yc8VTFJ0m8Hetmzz';
const clientSecret = 'qcB_PvB-BXLUTcCbO.67Mmiujmlqtp1y';
const redirectUri = 'http://localhost:3000/callback';
const state = 'YOUR_RANDOM_STATE_STRING';

router.post('/register', async function (req,res) {
    const {email, password, firstName, lastName, userName} = req.body;
    const accountType = 'listener';

    const user = await User.findOne({email: email });
    if(user){
        return res.status(404).json({error: 'A user with this email already exist'});
    }
    else {
        //here we convert the password plain text to encription so that security issues must be removed
        const hashedPassword = await bcrypt.hash(password,10);
        const newUserData = {email, password: hashedPassword, firstName, lastName, userName, accountType};
        const newUser = await User.create(newUserData);
        const token = await getToken(email, newUser); 
        const userToReturn = {...newUser.toJSON(), token};
        delete userToReturn.password;
        return res.status(200).json(userToReturn);
    }
});

router.post('/register/artist', async function (req,res) {
    const {email, password, firstName, lastName, userName} = req.body;
    const accountType = 'artist';

    const user = await User.findOne({email: email });
    if(user){
        return res.status(404).json({error: 'A user with this email already exist'});
    }
    else {
        //here we convert the password plain text to encription so that security issues must be removed
        const hashedPassword = await bcrypt.hash(password,10);
        const newUserData = {email, password: hashedPassword, firstName, lastName, userName, accountType};
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

router.post('/logout',passport.authenticate('jwt', {session: false}), async (req, res) => {
    res.cookie('token', '', { expires: new Date(0), httpOnly: true, sameSite: 'Strict', path: 'http://localhost:3000/' });
    res.json({ message: 'Logged out successfully' });
  });

const jwt = require('jsonwebtoken');
// const passport = require('passport');

const getToken = (email, user) => {
  const payload = {
    id: user._id, // Ensure the user ID is included here
    email: email,
  };

  return jwt.sign(payload, 'secret', { expiresIn: '30d' });
};

router.post('/proxy/token', async (req, res) => {
    const code = req.body.code;
    const clientId = req.body.client_id;
    const clientSecret = req.body.client_secret;
    const redirectUri = req.body.redirect_uri;
  
    console.log(clientId, clientSecret, code, redirectUri);
    try {
        const formData = new URLSearchParams();
        formData.append('client_id', clientId);
        formData.append('client_secret', clientSecret);
        formData.append('grant_type', 'authorization_code');
        formData.append('code', code);
        formData.append('redirect_uri', redirectUri);

        const response = await axios.post('https://auth.delta.nitt.edu/api/oauth/token', formData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        access_token=response.data.access_token;
      res.json(response.data);
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.get('/get/user/details', async (req, res) => {
    console.log(access_token);
        const response = await axios.post('https://auth.delta.nitt.edu/api/resources/user', {}, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
});

router.post('/create/user/dauth', async function (req,res) {
    const email = req.body.email;
    const firstName = req.body.name.split(" ")[0];
    const lastName = req.body.name.split(" ")[1];
    const userName = firstName+"_"+lastName;
    const accountType = req.body.accountType;

    const checkUser = await User.findOne({email: email});

    if(checkUser){
        const token = await getToken(checkUser.email, checkUser); 
    const userToReturn = {...checkUser.toJSON(), token};
    return res.status(200).json(userToReturn);
    }

    const newUserData = {email, firstName, lastName, userName, accountType};

    const user = await User.create(newUserData);

    const token = await getToken(email, user); 
    const userToReturn = {...user.toJSON(), token};
    return res.status(200).json(userToReturn);
});

module.exports = router;