const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = Schema({
    isTweet: {
        type: Boolean,
        default: false
    },
    isComment: {
        type: Boolean,
        default:false
    },
    isFollow: {
        type: Boolean,
        default: false
    },
    isLike: {
        type: Boolean,
        default: false
    },
    item: {
        type: Schema.Types.ObjectId
    },
    by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    seen: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);