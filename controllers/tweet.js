const Tweet = require('../models/tweet');
const User = require('../models/user');
const Comment = require('../models/comment');
const Retweet = require('../models/retweet');
const Notification = require('../models/notification');
const storage = require('../firebase.config');
const { ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');

const uploadAnImage = (imgFile, cb) => {
    const timestamps = Date.now();
    const nm = imgFile.originalname.split('.')[0];
    const type = imgFile.originalname.split('.')[1];
    const filename = `${nm}_${timestamps}.${type}`;

    const imageRef = ref(storage, `twitter/tweetsPics/${filename}`);
    uploadBytes(imageRef, imgFile.buffer)
    .then(snapshot => {
        console.log('tweet data uploaded');
        return getDownloadURL(snapshot.ref);
    })
    .then(url => {
        cb(url);
    })
}

exports.pullTweets = (req, res) => {
    const userId = req.userId;

    Tweet.find({by: userId}).populate('by', {password: 0})
    .then(tweets => {
        User.findById(userId, {following: 1})
        .then(user => {
            let thePromises = [];
            user.following.forEach(fol => {
                thePromises.push(Tweet.find({by: fol._id}).populate('by', {password: 0}));
            })

            Promise.all(thePromises)
            .then(values => {
                const ArrayToSend = [];
                ArrayToSend.push(...tweets);
                values.forEach(item => {
                    if(Array.isArray(item)) {
                        item.forEach(itm => {
                            ArrayToSend.push(itm);
                        })
                    } else {
                        ArrayToSend.push(item);
                    }
                })
                const thePromises = [];

                thePromises.push(Retweet.find({retweetedBy: userId}).populate('retweetedBy', {password: 0}).populate('tweet'));
                user.following.forEach(fol => {
                    thePromises.push(Retweet.find({retweetedBy: fol._id}).populate('retweetedBy', {password: 0}).populate('tweet'));
                })
                Promise.all(thePromises)
                .then(retweets => {
                    const theRetweets = [];
                    retweets.forEach(retw => {
                        if(Array.isArray(retw)) {
                            retw.forEach(rt => {
                                theRetweets.push(rt);
                            })
                        } else {
                            theRetweets.push(retw);
                        }
                    })
                    theRetweets.forEach(retw => {
                        const theRetw = {
                            _id: retw._id,
                            tweetId: retw.tweet._id,
                            retweetedBy: retw.retweetedBy.fullname,
                            by: retw.tweet.by,
                            text: retw.tweet.text,
                            media: retw.tweet.media,
                            location: retw.tweet.location,
                            likes: retw.tweet.likes,
                            retweets: retw.tweet.retweets,
                            views: retw.tweet.views,
                            comment: retw.tweet.comment,
                            createdAt: retw.createdAt
                        }
                        ArrayToSend.push(theRetw)
                    })
                    res.status(200).json({
                        tweets: ArrayToSend
                    })
                })
            })
        })
        // console.log(tweets);
        
    })
    .catch(err => {
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
}

exports.pullMyTweets = (req, res) => {
    const theId = req.params.id;

    Tweet.find({by: theId}).populate('by', {password: 0})
    .then(tweets => {
        Retweet.find({retweetedBy: theId}).populate('retweetedBy', {password: 0}).populate('tweet')
        .then(retweets => {
            let ArrayToSend = [...tweets];
            retweets.forEach(retw => {
                const theRetw = {
                    _id: retw._id,
                    tweetId: retw.tweet._id,
                    retweetedBy: retw.retweetedBy.fullname,
                    by: retw.tweet.by,
                    text: retw.tweet.text,
                    media: retw.tweet.media,
                    location: retw.tweet.location,
                    likes: retw.tweet.likes,
                    retweets: retw.tweet.retweets,
                    views: retw.tweet.views,
                    comment: retw.tweet.comment,
                    createdAt: retw.createdAt
                }
                ArrayToSend.push(theRetw)
            })
            res.status(200).json({
                tweets: ArrayToSend
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'something went wrong server-side'
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
}

exports.postTweet = async (req, res) => {
    const userId = req.userId;
    // console.log(userId);

    const pic1 = req.files[0];
    const pic2 = req.files[1];
    const pic3 = req.files[2];
    const pic4 = req.files[3];
    const text = req.body.text;
    const gif = req.body.gif;
    const myLocation = req.body.mylocation;
    User.findById(userId, {following: 1})
    .then(user => {
        if(pic1 && pic2 && pic3 && pic4) {
            uploadAnImage(pic1, url1 => {
                uploadAnImage(pic2, url2 => {
                    uploadAnImage(pic3, url3 => {
                        uploadAnImage(pic4, url4 => {
                            const tweet = new Tweet({
                                by: userId,
                                text: text,
                                media: [url1, url2, url3, url4],
                                gif: gif,
                                location: myLocation
                            });
                            tweet.save()
                            .then(tweet => {
                                Tweet.findById(tweet._id).populate('by', {password: 0})
                                .then(theTweet => {
                                    res.status(201).json({
                                        tweet: theTweet
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        message: 'something went wrong server-side'
                                    })
                                })
                                
                            })
                            .catch(err => {
                                res.status(500).json({
                                    message: 'something went wrong server-side'
                                })
                            })
                        })
                    })
                })
            })
        } else if(pic1 && pic2 && pic3 && !pic4) {
            uploadAnImage(pic1, url1 => {
                    uploadAnImage(pic2, url2 => {
                        uploadAnImage(pic3, url3 => {
                            const tweet = new Tweet({
                                by: userId,
                                text: text,
                                media: [url1, url2, url3],
                                location: myLocation,
                                gif: gif,
                            });
                            tweet.save()
                            .then(tweet => {
                                Tweet.findById(tweet._id).populate('by', {password: 0})
                                .then(theTweet => {
                                    res.status(201).json({
                                        tweet: theTweet
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        message: 'something went wrong server-side'
                                    })
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    message: 'something went wrong server-side'
                                })
                            })
                        })
                    })
                })
        } else if(pic1 && pic2 && !pic3 && !pic4) {
            uploadAnImage(pic1, url1 => {
                uploadAnImage(pic2, url2 => {
                    const tweet = new Tweet({
                        by: userId,
                        text: text,
                        media: [url1, url2],
                        location: myLocation,
                        gif: gif,
                    });
                    tweet.save()
                    .then(tweet => {
                        Tweet.findById(tweet._id).populate('by', {password: 0})
                            .then(theTweet => {
                                res.status(201).json({
                                    tweet: theTweet
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    message: 'something went wrong server-side'
                                })
                            })
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'something went wrong server-side'
                        })
                    })
                })
            })
        } else if(pic1 && !pic2 && !pic3 && !pic4) {
            uploadAnImage(pic1, url1 => {
                const tweet = new Tweet({
                    by: userId,
                    text: text,
                    media: [url1],
                    location: myLocation,
                    gif: gif,
                });
                tweet.save()
                .then(tweet => {
                    Tweet.findById(tweet._id).populate('by', {password: 0})
                        .then(theTweet => {
                            res.status(201).json({
                                tweet: theTweet
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: 'something went wrong server-side'
                            })
                        })
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'something went wrong server-side'
                    })
                })
            })
        } else {
            const tweet = new Tweet({
                    by: userId,
                    text: text,
                    location: myLocation,
                    gif: gif,
                });
                tweet.save()
                .then(tweet => {
                    Tweet.findById(tweet._id).populate('by', {password: 0})
                        .then(theTweet => {
                            res.status(201).json({
                                tweet: theTweet
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: 'something went wrong server-side'
                            })
                        })
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'something went wrong server-side'
                    })
                })
        }
    })
 }

 exports.tweetsCount = (req, res) => {
    const theId = req.params.id;

    Tweet.find({by: theId}).count()
    .then(response => {
        res.status(200).json({
            count: response
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Something went wrong server-side'
        })
    })
 }

 exports.issueView = (req, res) => {
    const tweetId = req.params.tweetId;

    Tweet.findById(tweetId)
    .then(tweet => {
        if(!tweet) {
            Comment.findById(tweetId)
            .then(comment => {
                comment.views += 1;
                comment.save()
                .then(result => {
                    res.status(201).json({
                        views: result.views
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        message: 'something went wrong server-side'
                    })
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'something went wrong server-side'
                })
            })
        } else {
            tweet.views += 1;
            tweet.save()
            .then(tweet => {
                res.status(201).json({
                    views: tweet.views
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'something went wrong server-side'
                })
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
 }

 exports.issueLike = (req, res) => {
    const likedBy = req.params.id;
    const tweetId = req.params.tweetId;

    Tweet.findById(tweetId)
    .then(tweet => {
        if(!tweet) {
            Comment.findById(tweetId)
            .then(comm => {
                comm.likes.push(likedBy);
                return comm.save();
            })
            .then(update => {
                if(likedBy === update.by.valueOf()) {
                    // console.log('they were same');
                    res.status(201).json({
                        likes: update.likes
                    })
                } else {
                    const notification = new Notification({
                        isLike: true,
                        item: update._id,
                        by: likedBy,
                        to: [update.by]
                    })
                    notification.save()
                    .then(notif => {
                        res.status(201).json({
                            likes: update.likes
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'something went wrong server-side'
                        })
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'something went wrong server-side'
                })
            })
        } else {
            tweet.likes.push(likedBy);
            tweet.save()
            .then(update => {
                if(likedBy === update.by.valueOf()) {
                    res.status(201).json({
                        likes: update.likes
                    })
                } else {
                    const notification = new Notification({
                        isLike: true,
                        item: update._id,
                        by: likedBy,
                        to: [update.by]
                    })
                    notification.save()
                    .then(notif => {
                        res.status(201).json({
                            likes: update.likes
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'something went wrong server-side'
                        })
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'something went wrong server-side'
                })
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
 }

 exports.issueUnlike = (req, res) => {
    const unLikedBy = req.params.id;
    const tweetId = req.params.tweetId;

    Tweet.findById(tweetId)
    .then(tweet => {
        if(!tweet) {
            Comment.findById(tweetId)
            .then(comment => {
                const theIndex = comment.likes.findIndex(like => like === unLikedBy);
                comment.likes.splice(theIndex, 1);
                return comment.save();
            })
            .then(update => {
                res.status(201).json({
                    likes: update.likes
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'something went wrong server-side'
                })
            })
        } else {
            const theIndex = tweet.likes.findIndex(like => like === unLikedBy);
            tweet.likes.splice(theIndex, 1);
            tweet.save()
            .then(update => {
                res.status(201).json({
                    likes: update.likes
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'something went wrong server-side'
                })
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
 }

 exports.issueRetweet = (req, res) => {
    const retweetedBy = req.params.id;
    const tweetId = req.params.tweetId;

    Tweet.findById(tweetId).populate('by', {password: 0})
    .then(tweet => {
        tweet.retweets.push(retweetedBy);
        tweet.save()
        .then(update1 => {
            const retweet = new Retweet({
                retweetedBy: retweetedBy,
                tweet: update1._id
            })
            return retweet.save();
        })
        .then(updated2 => {
            // This needs to be arranged to operate like a normal tweet with just two extra attribute
            Retweet.findById(updated2._id).populate('retweetedBy', {password: 0}).populate('tweet')
            .then(retweet => {
                const theRetweet = {
                    _id: retweet._id,
                    tweetId: retweet.tweet._id,
                    retweetedBy: retweet.retweetedBy.fullname,
                    by: tweet.by,
                    text: retweet.tweet.text,
                    media: retweet.tweet.media,
                    location: retweet.tweet.location,
                    likes: retweet.tweet.likes,
                    retweets: retweet.tweet.retweets,
                    views: retweet.tweet.views,
                    comment: retweet.tweet.comment,
                    createdAt: retweet.createdAt
                }
                res.status(201).json({
                    retweet: theRetweet
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'something went wrong server-side'
                })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'something went wrong server-side'
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
 }

 exports.issueUndoRetweet = (req, res) => {
    const retweetedBy = req.params.id;
    const tweetId = req.params.tweetId;
    const retweetId = req.params.retId;

    Tweet.findById(tweetId)
    .then(tweet => {
        const theTweetIndex = tweet.retweets.findIndex(el => el.toString() === retweetedBy);
        tweet.retweets.splice(theTweetIndex, 1);
        return tweet.save();
    })
    .then(tweet => {
        return Retweet.findByIdAndDelete(retweetId);
    })
    .then(result => {
        res.status(200).json({
            message: 'successfully unretweeted'
        })
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
 }

 exports.comment = (req, res) => {
    const userId = req.userId;
    const theImage = req.files[0];
    const text = req.body.text;
    const commentTo = req.body.commentTo;
    if(theImage) {
        uploadAnImage(theImage, url => {
            const comment = new Comment({
                by: userId,
                commentTo: commentTo,
                text: text,
                media: [url],
            })
            return comment.save();
        })
        .then(com => {
            Tweet.findById(commentTo)
            .then(tweet => {
                if(!tweet) {
                    Comment.findById(commentTo)
                    .then(comm => {
                        comm.comment.push(com._id);
                        return comm.save();
                    })
                } else {
                    tweet.comment.push(com._id);
                    return tweet.save();
                }
            })
            .then(result => {
                Comment.findById(com._id).populate('by', {password: 0})
                .then(comment => {
                    if(userId === result.by.valueOf()) {
                        res.status(201).json({
                            comment: comment
                        })
                    } else {
                        const notification = new Notification({
                            isComment: true,
                            item: commentTo,
                            by: userId,
                            to: [result.by]
                        })
                        notification.save()
                        .then(notif => {
                            res.status(201).json({
                                comment: comment
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: 'something went wrong server-side'
                            })
                        })
                    }                    
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'something went wrong server-side'
                    })
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'something went wrong server-side'
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'something went wrong server-side'
            })
        })
    } else {
         const comment = new Comment({
                by: userId,
                commentTo: commentTo,
                text: text
            })
            comment.save()
            .then(com => {
                Tweet.findById(commentTo)
                .then(tweet => {
                    if(!tweet) {
                        Comment.findById(commentTo)
                        .then(comm => {
                            comm.comment.push(com._id);
                            return comm.save();
                        })
                    } else {
                        tweet.comment.push(com._id);
                        return tweet.save();
                    }
                })
                .then(result => {
                    Comment.findById(com._id).populate('by', {password: 0})
                    .then(comment => {
                        if(userId === result.by.valueOf()) {
                            res.status(201).json({
                                comment: comment
                            })
                        } else {
                            const notification = new Notification({
                                isComment: true,
                                item: commentTo,
                                by: userId,
                                to: [result.by]
                            })
                            notification.save()
                            .then(notif => {
                                res.status(201).json({
                                    comment: comment
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    message: 'something went wrong server-side'
                                })
                            })
                        }
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'something went wrong server-side'
                        })
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        message: 'something went wrong server-side'
                    })
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'something went wrong server-side'
                })
            })
    }
 }

 exports.pullComments = (req, res) => {
    const tweetId = req.params.tweetId;

    Comment.find({commentTo: tweetId}).populate('by', {password: 0})
    .then(comments => {
        res.status(200).json({
            comments: comments
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
 }

 exports.getATweet = (req, res) => {
    const tweetId = req.params.tweetId;

    Tweet.findById(tweetId).populate('by', {password: 0})
    .then(tweet => {
        if(!tweet) {
            Comment.findById(tweetId).populate('by', {password: 0})
            .then(comment => {
                res.status(200).json({
                    tweet: comment
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'something went wrong server-side'
                })
            })
        } else {
           res.status(200).json({
                tweet: tweet
            }) 
        }
        
    })
    .catch(err => {
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
 }

//code to be revisited tearlier tomorrow!

//  exports.issueRetweet = (req, res) => {
//     const retweetedBy = req.params.id;
//     const tweetId = req.params.tweetId;

//     Tweet.findById(tweetId).populate('by', {password: 0})
//     .then(tweet => {
//         if(!tweet) {
//             Comment.findById(tweetId)
//             .then(comment => {
//                 comment.retweets.push(retweetedBy);
//                 comment.save()
//                 .then(update1 => {
//                     const retweet = new Retweet({
//                         retweetedBy: retweetedBy,
//                         tweet: update1._id
//                     })
//                     return retweet.save();
//                 })
//                 .then(updated2 => {
//                     Retweet.findById(updated2._id).populate('retweetedBy', {password: 0}).populate('tweet')
//                     .then(retweet => {
//                         const theRetweet = {
//                             _id: retweet._id,
//                             tweetId: retweet.tweet._id,
//                             retweetedBy: retweet.retweetedBy.fullname,
//                             by: comment.by,
//                             text: retweet.tweet.text,
//                             media: retweet.tweet.media,
//                             location: retweet.tweet.location,
//                             likes: retweet.tweet.likes,
//                             retweets: retweet.tweet.retweets,
//                             views: retweet.tweet.views,
//                             comment: retweet.tweet.comment,
//                             createdAt: retweet.createdAt
//                         }
//                         res.status(201).json({
//                             retweet: theRetweet
//                         })
//                     })
//                     .catch(err => {
//                         console.log(err);
//                         res.status(500).json({
//                             message: 'something went wrong server-side'
//                         })
//                     })
//                 })
//                 .catch(err => {
//                     console.log(err);
//                     res.status(500).json({
//                         message: 'something went wrong server-side'
//                     })
//                 })
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.status(500).json({
//                     message: 'something went wrong server-side'
//                 })
//             })
//         } else {
//             tweet.retweets.push(retweetedBy);
//             tweet.save()
//             .then(update1 => {
//                 const retweet = new Retweet({
//                     retweetedBy: retweetedBy,
//                     tweet: update1._id
//                 })
//                 return retweet.save();
//             })
//             .then(updated2 => {
//                 // This needs to be arranged to operate like a normal tweet with just two extra attribute
//                 Retweet.findById(updated2._id).populate('retweetedBy', {password: 0}).populate('tweet')
//                 .then(retweet => {
//                     const theRetweet = {
//                         _id: retweet._id,
//                         tweetId: retweet.tweet._id,
//                         retweetedBy: retweet.retweetedBy.fullname,
//                         by: tweet.by,
//                         text: retweet.tweet.text,
//                         media: retweet.tweet.media,
//                         location: retweet.tweet.location,
//                         likes: retweet.tweet.likes,
//                         retweets: retweet.tweet.retweets,
//                         views: retweet.tweet.views,
//                         comment: retweet.tweet.comment,
//                         createdAt: retweet.createdAt
//                     }
//                     res.status(201).json({
//                         retweet: theRetweet
//                     })
//                 })
//                 .catch(err => {
//                     console.log(err);
//                     res.status(500).json({
//                         message: 'something went wrong server-side'
//                     })
//                 })
//             })
//             .catch(err => {
//                 console.log(err);
//                 res.status(500).json({
//                     message: 'something went wrong server-side'
//                 })
//             })
//         }
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({
//             message: 'something went wrong server-side'
//         })
//     })
//  }

exports.storeNotification = (req, res) => {
    const notification = new Notification({
        isTweet: req.body.isTweet ? req.body.isTweet : false,
        isComment: req.body.isComment ? req.body.isComment : false,
        isFollow: req.body.isFollow ? req.body.isFollow : false,
        isLike: req.body.isLike ? req.body.isLike : false,
        item: req.body.item,
        by: req.userId,
        to: req.body.to
    })

    notification.save()
    .then(notif => {
        res.status(200).json({
            notification: notif
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
}

exports.getNotificationsCount = (req, res) => {
    const me = req.userId;

    Notification.find({seen: false, to: me }).count()
    .then(number => {
        // console.log(number);
        res.status(200).json({
            number: number
        })
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
}

exports.getNotifications = (req, res) => {
    const me = req.userId;

    Notification.find({seen: false, to: me}).populate('by', {password: 0})
    .then(notifications => {
        res.status(200).json({
            notifications: notifications
        })  
    })
    .catch(err => {
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
}

exports.notificationSeen = (req, res) => {
    const notifId = req.params.id;

    Notification.findById(notifId)
    .then(notification => {
        notification.seen = true;
        notification.save()
        .then(update => {
            res.status(201).json({
                seen: update.seen
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'something went wrong server-side'
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
}