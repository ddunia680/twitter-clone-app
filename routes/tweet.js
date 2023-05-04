const express = require('express');
const isAuth = require('../middleware/isAuth');
const tweetControllers = require('../controllers/tweet');

const router = express.Router();

router.post('/tweet', isAuth, tweetControllers.postTweet);

router.get('/pullMyTweet', isAuth, tweetControllers.pullMyTweets);

module.exports = router;