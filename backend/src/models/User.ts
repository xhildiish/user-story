import mongoose from "mongoose"

const { Schema } = mongoose;

const userSchema = new Schema({
    githubId: {
        type: String,
    },
    name: {
        type: String
    },
    img: {
        type: String
    },
    bio: {
        type: String
    },
    repos: {
        type: Array
    }
});

module.exports = mongoose.model('user', userSchema);