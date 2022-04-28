"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("../models/User");
const keys_1 = __importDefault(require("../config/keys"));
const axios_1 = __importDefault(require("axios"));
const passport = require('passport');
const Github = require('passport-github2').Strategy;
const User = mongoose_1.default.model('user');
passport.use(new Github({
    clientID: keys_1.default.githubClientID,
    clientSecret: keys_1.default.githubClientSecret,
    callbackURL: 'http://localhost:3006/auth/github/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ githubId: profile.id })
        .then((existingUser) => __awaiter(void 0, void 0, void 0, function* () {
        if (existingUser) {
            done(null, existingUser);
        }
        else {
            const response = yield axios_1.default.get(`https://api.github.com/user/${profile.id}`);
            const data = yield response.data;
            const repos = yield axios_1.default.get(`https://api.github.com/user/${profile.id}/starred`);
            const reposData = yield repos.data;
            const newUser = new User({
                githubId: profile.id,
                name: data.login,
                img: data.avatar_url,
                bio: data.bio,
                repos: reposData
            });
            newUser.save()
                .then((user) => done(null, user));
        }
    }));
}));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
//# sourceMappingURL=passport.js.map