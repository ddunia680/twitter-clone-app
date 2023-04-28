const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tweetSchema = Schema({
    by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String
    },
    medio: {
        type: String
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    ,
    retweets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    views: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    comment: [
        {
            type: Object,
            ref: 'Comment'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Tweet', tweetSchema);