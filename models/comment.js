const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = Schema({
    by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentTo: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet'
    },
    text: {
        type: String
    },
    media: {
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

module.exports = mongoose.model('Comment', commentSchema);