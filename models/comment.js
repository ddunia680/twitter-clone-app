const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = Schema({
    by: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    commentTo: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    media: {
        type: Array
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
            type: Schema.Types.ObjectId
        }
    ],
    views:
        {
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

module.exports = mongoose.model('Comment', commentSchema);