const express = require('express');
const isAuth = require('../middleware/isAuth');
const usersControllers = require('../controllers/users');

const router = express.Router();

router.get('/youmlike/:userId', usersControllers.youMLike);

router.get('/moreUsers', isAuth, usersControllers.moreUsers);

router.get('/getAUser/:id', usersControllers.getAUser);

router.post('/followUser', isAuth, usersControllers.followUser);

router.post('/unfollowUser', isAuth, usersControllers.unfollowUser);

router.get('/followStatus/:user', usersControllers.pullFollowStatus);

router.get('/searchUser/:value/:myId', usersControllers.searchUsers);

router.get('/followCenter/:id', usersControllers.pullFollowCenter);

module.exports = router;