import mongoose from 'mongoose'
import "../models/User"
import keys from "../config/keys"
import axios from "axios"

const passport = require('passport');
const Github = require('passport-github2').Strategy;

const User = mongoose.model('user');

passport.use(new Github({
    clientID: keys.githubClientID,
    clientSecret: keys.githubClientSecret,
    callbackURL: 'http://localhost:3006/auth/github/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {

    User.findOne({ githubId: profile.id })
        .then(async (existingUser) => {
            if (existingUser) {
                done(null, existingUser);
            } else {
                const response = await axios.get(`https://api.github.com/user/${profile.id}`)
                const data = await response.data

                const repos = await axios.get(`https://api.github.com/user/${profile.id}/starred`)
                const reposData = await repos.data

                const newUser = new User({ 
                    githubId: profile.id,
                    name: data.login,
                    img: data.avatar_url,
                    bio: data.bio,
                    repos: reposData
                })
                newUser.save()
                .then((user) => done(null, user))
            }
        })
})
);

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});