const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/user');
const Tweet = require('./models/tweet');
const Comment = require('./models/comment');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const tweetsRoutes = require('./routes/tweet');

const app = express();
const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'audio/mpeg' || 
        file.mimetype === 'application/pdf'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
app.use(cors({
    origin: '*',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    methods: ['POST', 'GET', 'PUT']
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(multer({fileFilter: fileFilter }).array('photos', 12));

app.use('/auth', authRoutes);
app.use(usersRoutes);
app.use(tweetsRoutes);
// app.use('/', (req, res) => {
//     res.send('welcome to the app');
// })

const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGODB_API_KEY)
.then(response => {
    const server = app.listen(PORT, () => {
        console.log('server is running on port '+ PORT);
    });

    const io = require('./socket').init(server);
    io.on('connection', socket => {
        let user_identification;
        console.log(`Client ${socket.id} is connected`);

        socket.on('setup', (user_id) => {
            user_identification = user_id;
            console.log(`User ${socket.id} initially joined room ${user_id}`);
            socket.join(user_id);
        });

        socket.on('newTweet', (tweet) => {
            User.findById(tweet.by._id, {followers: 1})
            .then(user => {
                user.followers.forEach(fol => {
                    socket.to(fol._id.valueOf()).emit('gotNewTweet', tweet);
                })
            })
        });

        socket.on('madeALike', notif => {
            socket.to(notif.to).emit('gotALike', notif);
        });

        socket.on('madeAView', tweet => {
            User.findById(tweet.by, {followers: 1})
            .then(user => {
                user.followers.forEach(fol => {
                    socket.to(fol._id.valueOf()).emit('gotView',  tweet.tweet);
                })
            })
        });

        socket.on('followedSomeone', followData => {
            socket.to(followData.to).emit('gotAFollower', followData);
        });

        socket.on('madeAComment', comment => {
            // console.log(comment);
            Tweet.findById(comment. commentTo).populate('by', {password: 0})
            .then(tweet => {
                if(!tweet) {
                    Comment.findById(comment.commentTo).populate('by', {password: 0})
                    .then(comm => {
                        // console.log(comm.by._id.valueOf());
                        comm.by.followers.forEach(fol => {
                            socket.to(fol._id.valueOf()).emit('gotComment', comment);
                        })
                        socket.to(comm.by._id.valueOf()).emit('commentToMyTweet', comment);
                    })
                } else {
                    // console.log(tweet.by._id.valueOf());
                    tweet.by.followers.forEach(fol => {
                        socket.to(fol._id.valueOf()).emit('gotComment', comment);
                    })
                    socket.to(tweet.by._id.valueOf()).emit('commentToMyTweet', comment);
                }
            })            
        })

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`);
        })
    })
})
