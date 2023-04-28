const User = require('../models/user');

exports.youMLike = (req, res, next) => {
    const userId = req.params.userId;

    User.find({_id: {$ne: userId}}, {password: 0}).limit(100)
    .then(users => {
        let theNewArr = [];
        users.forEach(user => {
            const foundUser = user.followers.find(el => el.toString() === userId.toString());
            if(!foundUser) {
                theNewArr.push(user);
            }
        });
        return theNewArr;
    })
    .then(theArr => {
        let arrToSend = [];
        arrToSend.push(theArr[0], theArr[1], theArr[2]);
        res.status(200).json({
            message: 'data pulled successfully',
            users: arrToSend
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
}

exports.moreUsers = (req, res, next) => {
    const userId = req.userId;

    User.find({_id: {$ne: userId}}, {password: 0})
    .then(users => {
        let theNewArr = [];
        users.forEach(user => {
            const foundUser = user.followers.find(el => el.toString() === userId.toString());
            if(!foundUser) {
                theNewArr.push(user);
            }
        });
        return theNewArr;
    })
    .then(theArr => {
        // console.log(users);
        res.status(200).json({
            message: 'data pulled successfully',
            users: theArr
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    })
}

exports.followUser = (req, res) => {
    const userId = req.userId;
    const userToFollow = req.body.toFollow;

    User.findById(userId)
    .then(me => {
        me.following.push(userToFollow);
        me.save();
    })
    .then(response => {
        User.findById(userToFollow)
        .then(user => {
            user.followers.push(userId);
            user.save();
        })
        .then(response => {
            res.status(200).json({
                message: 'followed user successfully'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Something went wrong server-side'
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong server-side'
        })
    })
}

exports.unfollowUser = (req, res) => {
    const userId = req.userId;
    const userToUnfollow = req.body.toFollow;

    User.findById(userId)
    .then(me => {
        me.following.filter(fol => fol.toString() !== userToUnfollow.toString());
        me.save();
    })
    .then(response => {
        User.findById(userToUnfollow)
        .then(user => {
            user.followers.filter(fol => fol.toString() !== userId.toString());
            user.save();
        })
        .then(response => {
            res.status(200).json({
                message: 'unfollowed user successfully'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Something went wrong server-side'
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong server-side'
        })
    })
}

exports.pullFollowStatus = (req, res) => {
    const userId = req.params.user;
    console.log(userId);

    User.findById(userId, {followers: 1, following: 1})
    .then(user => {
        res.status(200).json({
            followers: user.followers,
            following: user.following
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Something went wrong server-side'
        })
    })
}

exports.searchUsers = (req, res) => {
    
}