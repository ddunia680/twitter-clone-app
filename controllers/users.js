const User = require('../models/user');

exports.youMLike = (req, res, next) => {
    const userId = req.params.userId;

    User.find({_id: {$ne: userId}}, {password: 0}).limit(100)
    .then(users => {
        // console.log(users);
        let theNewArr = [];
        users.forEach(user => {
            const foundUser = user.followers.find(el => el._id.toString() === userId.toString());
            if(!foundUser) {
                theNewArr.push(user);
            }
        });
        return theNewArr;
    })
    .then(theArr => {
        // console.log(theArr);
        let arrToSend = [];
        theArr[0] ? arrToSend.push(theArr[0]) : null;
        theArr[1] ? arrToSend.push(theArr[1]) : null;
        theArr[2] ? arrToSend.push(theArr[2]) : null;
        // arrToSend.push(theArr[0], theArr[1], theArr[2]);
        // console.log(theArr);
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
            const foundUser = user.followers.find(el => el._id.toString() === userId.toString());
            if(!foundUser) {
                theNewArr.push(user);
            }
        });
        return theNewArr;
    })
    .then(theArr => {
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

exports.getAUser = (req, res) => {
    const theId = req.params.id;
    console.log(theId);
    User.findById(theId, {password: 0})
    .then(user => {
        res.status(200).json({
            user: user
        })
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({
            message: 'Something went wrong server-side'
        })
    })
}

exports.followUser = (req, res) => {
    const userId = req.userId;
    const userToFollow = req.body.toFollow;

    User.findById(userId)
    .then(me => {
        me.following.push(userToFollow);
        me.save()
        .then(response => {
            User.findById(userToFollow._id)
            .then(user => {
                user.followers.push({_id: me._id, profileUrl: me.profileUrl, fullname: me.fullname, tagName: me.tagName});
                user.save()
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
            }).catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Something went wrong server-side'
                })
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Something went wrong server-side'
            })
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong server-side'
        })
    })
}

exports.unfollowUser = (req, res) => {
    const userId = req.userId;
    const userToUnfollow = req.body.toFollow;
    // console.log(userToUnfollow);

    User.findById(userId)
    .then(me => {
        const theIndex = me.following.findIndex(fol => fol._id.toString() === userToUnfollow.toString());
        // me.following.filter(fol => fol.toString() !== new ObjectId(userToUnfollow));
        me.following.splice(theIndex, 1);
        return me.save();
    })
    .then(response => {
        User.findById(userToUnfollow)
        .then(user => {
            const theIndex = user.followers.findIndex(fol => fol._id.toString() === userId.toString());
            user.followers.splice(theIndex, 1);
            // user.followers.filter(fol => fol !== new ObjectId(userId));
            return user.save();
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

    User.findById(userId, {followers: 1, following: 1})
    .then(user => {
        res.status(200).json({
            followers: user.followers,
            following: user.following
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong server-side'
        })
    })
}

exports.searchUsers = (req, res) => {
    const value = req.params.value;
    const userId = req.params.myId;
    
    User.find({$and: [{_id: {$ne: userId}}, {fullname: new RegExp('^' + value, "i")}]}, {password: 0})
    .then(users => {
        res.status(200).json({
            users: users
        })
    })
    .catch(err => {
        res.status(500).json({
                message: 'something went wrong server-side'
            })
    })
}

exports.pullFollowCenter = (req, res) => {
    const theId = req.params.id;

    User.findById(theId, {following: 1, followers: 1})
    .then(users => {
        res.status(200).json({
            followers: users.followers,
            following: users.following
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'Something went wrong server-side'
        })
    })
        
}