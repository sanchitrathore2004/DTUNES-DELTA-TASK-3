const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const axios = require('axios');
const cookieParser = require('cookie-parser');
// const {getToken} = require('../utils/helper');

router.use(cookieParser());


const clientId = 'Yc8VTFJ0m8Hetmzz';
const clientSecret = 'qcB_PvB-BXLUTcCbO.67Mmiujmlqtp1y';
const redirectUri = 'http://localhost:3000/callback';
const state = 'YOUR_RANDOM_STATE_STRING';

router.get('/callback', async (req, res) => {
    const authorizationCode = req.query.code;
    const receivedState = req.query.state;

    // Validate the state parameter to prevent CSRF attacks
    if (receivedState !== state) {
        res.status(400).send('Invalid state parameter');
        return;
    }

    try {
        const tokenUrl = 'https://auth.delta.nitt.edu/api/oauth/token';
        const response = await axios.post(tokenUrl, null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'authorization_code',
                code: authorizationCode,
                redirect_uri: redirectUri,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log('Token response:', response.data);

        const { access_token, id_token } = response.data;

        // return res.status(200).json({token: access_token});

        // Store the access token in a cookie
        const date = new Date();
        date.setDate(date.getDate() + 30);
           res.cookie('token', access_token, {
            path: '/',
            expires: date,
            httpOnly: true, // Helps mitigate XSS attacks
            secure: false,  // Set to true if using HTTPS
            sameSite: 'Lax', // Adjust as necessary, e.g., 'Strict' or 'None' (if cross-site)
        });

        // Redirect to the home page or another protected route
        res.redirect('http://localhost:3000/loggedin/home');
    } catch (error) {
        console.error('Error fetching access token:', error);
        res.status(500).send('Failed to obtain access token');
    }
});

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



module.exports = router;