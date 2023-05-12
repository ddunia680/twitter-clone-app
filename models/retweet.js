const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reTweetSchema = Schema({
    retweetedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tweet: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Retweet', reTweetSchema);