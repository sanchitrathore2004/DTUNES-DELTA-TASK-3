const express = require("express");
const mongoose = require("mongoose");
const app = express();
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();
const passport = require('passport');
const User = require('./models/user');
const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/songs');
const playlistRoutes = require('./routes/playlist');
const myDetails = require('./routes/myDetails');
const port = 8000;
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb+srv://rathoresanchit786:${process.env.MONGO_PASSWORD}@cluster0.lzil7z1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
    // userNewUrlParser: true,
    // useUnifiedTopology: true
}).then((x)=>{
    console.log('connected to mongodb');
}).catch((err)=>{
    console.log('error connecting to mongodb',err);
});

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));
 

app.get('/', function (req,res){
    res.send('hello');
});

app.use('/auth', authRoutes);
app.use('/song', songRoutes);
app.use('/playlist', playlistRoutes);
app.use('/me', myDetails);

app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function () {
    console.log(`app running on ${port}`);
});