const express = require('express');
const isAuth = require('../middleware/isAuth');
const tweetControllers = require('../controllers/tweet');

const router = express.Router();

router.post('/tweet', isAuth, tweetControllers.postTweet);

router.get('/pullTweet', isAuth, tweetControllers.pullTweets);

router.get('/pullMyTweets/:id', isAuth, tweetControllers.pullMyTweets);

router.get('/tweetsCount/:id', isAuth, tweetControllers.tweetsCount);

router.post('/issueView/:id/:tweetId', tweetControllers.issueView);

router.post('/issueLike/:id/:tweetId', tweetControllers.issueLike);

router.post('/issueUnlike/:id/:tweetId', tweetControllers.issueUnlike);

router.post('/issueRetweet/:id/:tweetId', tweetControllers.issueRetweet);

router.post('/issueUndoRetweet/:id/:tweetId/retId', tweetControllers.issueUndoRetweet);

module.exports = router;