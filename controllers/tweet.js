const Tweet = require('../models/tweet');
const User = require('../models/user');
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

exports.pullMyTweets = (req, res) => {
    const userId = req.userId;

    Tweet.find({by: userId}).populate('by', {password: 0})
    .then(tweets => {
        // console.log(tweets);
        res.status(200).json({
            tweets: tweets
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