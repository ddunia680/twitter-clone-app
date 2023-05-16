const Tweet = require('../models/tweet');
const User = require('../models/user');
const Retweet = require('../models/retweet');
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
                
                Retweet.find({retweetedBy: userId}).populate('retweetedBy', {password: 0}).populate('tweet')
                .then(retweets => {
                    retweets.forEach(retw => {
                        const theRetw = {
                            _id: retw._id,
                            tweetId: retw.tweet._id ,
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
    const viewedBy = req.params.id;
    const tweetId = req.params.tweetId;

    Tweet.findById(tweetId).populate('by', {password: 0})
    .then(tweet => {
        // Case where we found a retweet instead
        if(!tweet) {
            Retweet.findById(tweetId).populate('tweet')
            .then(retw => {
                res.status(200).json({
                    views: retw.tweet.views
                })
            })
            .catch(err => res.status(500).json({
                    message: 'something went wrong server-side'
            }));
        }
        else if(tweet.by._id.toString() !== viewedBy.toString()) {
            tweet.views += 1; 

            tweet.save()
                .then(result => {
                res.status(201).json({
                    views: result.views
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'something went wrong server-side'
                })
            })
        } else {
            res.status(201).json({
                views: tweet.views
            })
        }
    })
    .catch(err => {
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
        tweet.likes.push(likedBy);
        return tweet.save();
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
 }

 exports.issueUnlike = (req, res) => {
    const unLikedBy = req.params.id;
    const tweetId = req.params.tweetId;

    Tweet.findById(tweetId)
    .then(tweet => {
        const theIndex = tweet.likes.findIndex(like => like === unLikedBy);
        tweet.likes.splice(theIndex, 1);
        return tweet.save();
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
            // This needs to be arranged to operate like a normal tweet with just one extra attribute
            Retweet.findById(updated2._id).populate('retweetedBy', {password: 0}).populate('tweet')
            .then(retweet => {
                const theRetweet = {
                    _id: retweet._id,
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
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })


 }