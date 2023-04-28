const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

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
    origin: process.env.FRONT_ENDPOINT,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    methods: ['POST', 'GET', 'PUT']
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(multer({fileFilter: fileFilter }).array('photos', 12));

app.use('/auth', authRoutes);
app.use(usersRoutes);
// app.use('/', (req, res) => {
//     res.send('welcome to the app');
// })

const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGODB_API_KEY)
.then(response => {
    app.listen(PORT, () => {
        console.log('server is running on port '+ PORT);
    });
})
