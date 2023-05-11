const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
    profileUrl: {
        type: String,
        required: true
    },
    coverUrl: {
        type: String
    },
    fullname: {
        type: String,
        required: true
    },
    tagName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
    },
    website: {
        type: String,
    },
    following: [
        {type: Object}
    ],
    followers: [
        {type: Object}
    ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);