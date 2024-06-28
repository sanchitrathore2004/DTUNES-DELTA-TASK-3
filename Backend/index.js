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
const port = 8000;

app.use(express.json());

const username="rathoresanchit786";
const password = "HrRV9kz1KC9hy2jw";

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.luxtkjq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
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
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get('/', function (req,res){
    res.send('hello');
});

app.use('/auth', authRoutes);
app.use('/song', songRoutes);
app.use('/playlist', playlistRoutes);

app.listen(port, function () {
    console.log(`app running on ${port}`);
});