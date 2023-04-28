const { validationResult } = require('express-validator');
const User = require('../models/user');
const storage = require('../firebase.config');
const { ref, uploadBytes, getDownloadURL, deleteObject, getStorage } = require('firebase/storage');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
    console.log('we reached here');
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors.array()[0].msg);
        return res.status(422).json({
            message: errors.array()[0].msg
        })
    }

    const cover = req.files[0];
    const profile = req.files[1];
    const fullName = req.body.fullName;
    const tagName = req.body.tagName;
    const email = req.body.email;
    const bio = req.body.bio;
    const password = req.body.password;
    const confirmPass = req.body.confirmPass;
    const location = req.body.location;
    const website = req.body.website;

    if(!profile) {
        return res.status(422).json({
            message: 'profile picture not included'
        })
    }

    if(password !== confirmPass) {
        return res.status(422).json({
            message: "passwords don't match!"
        })
    }
    const timestamps = Date.now();
    const nm = cover.originalname.split('.')[0];
    const type = cover.originalname.split('.')[1];
    const filename = `${nm}_${timestamps}.${type}`;

    const imageRef = ref(storage, `twitter/coverPics/${filename}`);
    uploadBytes(imageRef, cover.buffer)
    .then(snapshot => {
        console.log('profile uploaded');
        return getDownloadURL(snapshot.ref);
    })
    .then(coverUrl => {
        const timestamps = Date.now();
        const nm = profile.originalname.split('.')[0];
        const type = profile.originalname.split('.')[1];
        const filename = `${nm}_${timestamps}.${type}`;

        const imageRef = ref(storage, `twitter/profile-pics/${filename}`);
        uploadBytes(imageRef, profile.buffer)
        .then(snapshot => {
            console.log('profile uploaded');
            return getDownloadURL(snapshot.ref);
        })
        .then(url => {
            bcrypt.hash(password, 12)
            .then(hashedPass => {
                const user = new User({
                    coverUrl: coverUrl,
                    profileUrl: url,
                    fullname: fullName,
                    tagName: tagName,
                    email: email,
                    bio: bio,
                    password: hashedPass,
                    location: location,
                    website: website
                });

                return user.save();
            })
            .then(userData => {
                res.status(201).json({
                    message: 'account created successfully'
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

    
    
}

exports.login = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.array()[0].msg
        })
    }

    const email = req.body.email;
    const password = req.body.password;


    User.findOne({email: email})
    .then(user => {
        bcrypt.compare(password, user.password)
        .then(isEqual => {
            if(!isEqual) {
                return res.status(422).json({
                    message: 'incorrect password'
                })
            }

            const token = jwt.sign(
                {
                    userId: user._id.toString(),
                    fullname: user.fullname,
                    profileUrl: user.profileUrl
                },
                'someveryverytrickyhash',
                { expiresIn: '1h' }
            );
            res.status(200).json({
                token: token,
                userId: user._id,
                profileUrl: user.profileUrl,
                coverUrl: user.coverUrl,
                tagName: user.tagName,
                fullname: user.fullname,
                bio: user.bio,
                email: user.email,
                website: user.website,
                location: user.location,
                createdAt: user.createdAt
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

exports.updateUser = (req, res, next) => {
    const userId = req.userId;
    let cover;
    let profile;
    let fullname;
    let tagName;
    let bio;
    let email;
    let location;
    let website;

    if(req.body.isCover) {
        cover = req.files[0];
    } else if(req.body.isProfile) {
        profile = req.files[0];
    } else if(req.body.bothPics ) {
        cover = req.files[0];
        profile = req.files[1];
    }

    req.body.fullName ? fullname = req.body.fullName : null; 
    req.body.tagName ? tagName = req.body.tagName : null;
    req.body.bio ? bio = req.body.bio : null;
    req.body.email ? email = req.body.email : null;
    req.body.location ? location = req.body.location : null;
    req.body.website ? website = req.body.website : null;

    if(fullname) {
        User.findOne({fullname: fullname})
        .then(user => {
            if(user) {
                return res.status(422).json({
                    message: 'fullname already in use'
                })
            }
        })
    } else if(tagName) {
        User.findOne({tagName: tagName})
        .then(user => {
            if(user) {
                return res.status(422).json({
                    message: 'tagName already in use'
                })
            }
        })
    } else if(bio) {
        User.findOne({bio: bio})
        .then(user => {
            if(user) {
                return res.status(422).json({
                    message: 'bio already in use'
                })
            }
        })
    } else if(email) {
        User.findOne({email: email})
        .then(user => {
            if(user) {
                return res.status(422).json({
                    message: 'email already in use'
                })
            }
        })
    }

    User.findById(userId)
    .then(user => {
        if(cover) {
            if(user.coverUrl) {
                const desertRef = ref(storage, user.coverUrl);
                deleteObject(desertRef).then(() => {
                    console.log('old cover deleted successfully');
                }).catch(err => console.log(err));
            }

        }
        if(profile) {
            if(user.profileUrl) {
                const desertRef = ref(storage, user.profileUrl);
                deleteObject(desertRef).then(() => {
                    console.log('old cover deleted successfully');
                }).catch(err => console.log(err));
            }
        }

        if(!cover && !profile) {
            fullname ? user.fullName = fullname : null;
            tagName ? user.tagName = tagName : null;
            email ? user.email = email : null;
            bio ? user.bio = bio : null;
            location ? user.location = location : null;
            website ? user.website = website : null;

            user.save()
            .then(updatedUser => {
                let dataToSend = {
                    profileUrl: updatedUser.profileUrl,
                    coverUrl: updatedUser.coverUrl,
                    fullname: updatedUser.fullname,
                    tagName: updatedUser.tagName,
                    email: updatedUser.email,
                    bio: updatedUser.bio,
                    location: updatedUser.location,
                    website: updatedUser.website,
                    createdAt: updatedUser.createdAt
                }
                res.status(201).json({
                    message: 'updated successfully',
                    userData: dataToSend
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'something went wrong server-side'
                })
            });
        //case no picture is included 
        } else if(cover && !profile) {
            const timestamps = Date.now();
            const nm = cover.originalname.split('.')[0];
            const type = cover.originalname.split('.')[1];
            const filename = `${nm}_${timestamps}.${type}`;

            const imageRef = ref(storage, `twitter/coverPics/${filename}`);
            uploadBytes(imageRef, cover.buffer)
            .then(snapshot => {
                console.log('cover uploaded');
                return getDownloadURL(snapshot.ref);
            })
            .then(url => {
                user.coverUrl = url;
                fullname ? user.fullName = fullname : null;
                tagName ? user.tagName = tagName : null;
                email ? user.email = email : null;
                bio ? user.bio = bio : null;
                location ? user.location = location : null;
                website ? user.website = website : null;

                return user.save();
            })
            .then(updatedUser => {
                let dataToSend = {
                    profileUrl: updatedUser.profileUrl,
                    coverUrl: updatedUser.coverUrl,
                    fullname: updatedUser.fullname,
                    tagName: updatedUser.tagName,
                    email: updatedUser.email,
                    bio: updatedUser.bio,
                    location: updatedUser.location,
                    website: updatedUser.website,
                    createdAt: updatedUser.createdAt
                }
                res.status(201).json({
                    message: 'updated successfully',
                    userData: dataToSend
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'something went wrong server-side'
                })
            });
            // Case profile only
        } else if(profile && !cover) {
            const timestamps = Date.now();
            const nm = profile.originalname.split('.')[0];
            const type = profile.originalname.split('.')[1];
            const filename = `${nm}_${timestamps}.${type}`;

            const imageRef = ref(storage, `twitter/profile-pics/${filename}`);
            uploadBytes(imageRef, profile.buffer)
            .then(snapshot => {
                console.log('profile uploaded');
                return getDownloadURL(snapshot.ref);
            })
            .then(url => {
                user.profileUrl = url;
                fullname ? user.fullName = fullname : null;
                tagName ? user.tagName = tagName : null;
                email ? user.email = email : null;
                bio ? user.bio = bio : null;
                location ? user.location = location : null;
                website ? user.website = website : null;

                return user.save();
            })
            .then(updatedUser => {
                let dataToSend = {
                    profileUrl: updatedUser.profileUrl,
                    coverUrl: updatedUser.coverUrl,
                    fullname: updatedUser.fullname,
                    tagName: updatedUser.tagName,
                    email: updatedUser.email,
                    bio: updatedUser.bio,
                    location: updatedUser.location,
                    website: updatedUser.website,
                    createdAt: updatedUser.createdAt
                }
                res.status(201).json({
                    message: 'updated successfully',
                    userData: dataToSend
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: 'something went wrong server-side'
                })
            });
            // case both
        } else if (cover && profile) {
            const timestamps = Date.now();
            const nm = cover.originalname.split('.')[0];
            const type = cover.originalname.split('.')[1];
            const filename = `${nm}_${timestamps}.${type}`;

            const imageRef = ref(storage, `twitter/coverPics/${filename}`);
            uploadBytes(imageRef, cover.buffer)
            .then(snapshot => {
                console.log('cover uploaded');
                return getDownloadURL(snapshot.ref);
            })
            .then(covUrl => {
                const timestamps = Date.now();
                const nm = profile.originalname.split('.')[0];
                const type = profile.originalname.split('.')[1];
                const filename = `${nm}_${timestamps}.${type}`;

                const imageRef = ref(storage, `twitter/profile-pics/${filename}`);
                uploadBytes(imageRef, profile.buffer)
                .then(snapshot => {
                    console.log('profile uploaded');
                    return getDownloadURL(snapshot.ref);
                })
                .then(provUrl => {
                    user.profileUrl = provUrl;
                    user.coverUrl = covUrl;
                    fullname ? user.fullName = fullname : null;
                    tagName ? user.tagName = tagName : null;
                    email ? user.email = email : null;
                    bio ? user.bio = bio : null;
                    location ? user.location = location : null;
                    website ? user.website = website : null;

                    return user.save();
                })
                .then(updatedUser => {
                    let dataToSend = {
                        profileUrl: updatedUser.profileUrl,
                        coverUrl: updatedUser.coverUrl,
                        fullname: updatedUser.fullname,
                        tagName: updatedUser.tagName,
                        email: updatedUser.email,
                        bio: updatedUser.bio,
                        location: updatedUser.location,
                        website: updatedUser.website,
                        createdAt: updatedUser.createdAt
                    }
                    res.status(201).json({
                        message: 'updated successfully',
                        userData: dataToSend
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        message: 'something went wrong server-side'
                    })
                });
            })
            .catch(err => {
                res.status(500).json({
                    message: 'something went wrong server-side'
                })
            });
        }

    })
    .catch(err => {
        res.status(500).json({
            message: 'something went wrong server-side'
        })
    });
}