const express = require('express');
const isAuth = require('../middleware/isAuth');
const usersControllers = require('../controllers/users');

const router = express.Router();

router.get('/youmlike/:userId', usersControllers.youMLike);

router.get('/moreUsers', isAuth, usersControllers.moreUsers);

router.post('/followUser', isAuth, usersControllers.followUser);

router.post('/unfollowUser', isAuth, usersControllers.unfollowUser);

router.get('/followStatus/:user', usersControllers.pullFollowStatus);

router.get('/searchUser/:value/:myId', usersControllers.searchUsers);

module.exports = router;