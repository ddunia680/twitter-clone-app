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
    media: {
        type: Array
    },
    gif: {
        type: String
    },
    location: {
        type: String
    },
    likes: [
        {
            type: Object
        }
    ],
    retweets: [
        {
            type: Schema.Types.ObjectId
        }
    ],
    views: {
        type: Number,
        default: 0
    },
    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Tweet', tweetSchema);