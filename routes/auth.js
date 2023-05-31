const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.put('/register', [
    body('fullName').isLength({min: 5}).withMessage('wrong fullname').custom((value, { req }) => {
        return User.findOne({fullname: value}).then(userDoc => {
            if(userDoc) {
                return Promise.reject('fullname already in use!')
            }
        })
    }),
    body('tagName').isLength({min: 5}).withMessage('wrong tagName').custom((value, { req }) => {
        return User.findOne({tagName: value}).then(userDoc => {
            if(userDoc) {
                return Promise.reject('tagName already in use!')
            }
        })
    }),
    body('email').isEmail().withMessage('invalid email').custom((value, { req }) => {
        return User.findOne({email: value}).then(userDoc => {
            if(userDoc) {
                return Promise.reject('email aready in use!')
            }
        })
    }).normalizeEmail(),
    body('password').trim().isLength({min: 5}).withMessage('wrong password'),
    body('confirmPass').trim().isLength({min: 5}).withMessage('wrong confirm password')
], authController.signUp);

router.post('/login', [
    body('email').isEmail().withMessage('invalid email').custom((value, { req }) => {
        return User.findOne({email: value}).then(userDoc => {
            if(!userDoc) {
                return Promise.reject("email doesn't exist!")
            }
        })
    })
    .normalizeEmail(),
    body('password').trim().isLength({min: 5}).withMessage('wrong password'),
], authController.login);

router.post('/updateuser', isAuth, authController.updateUser);

router.get('/getCode/:email', authController.getCode);

router.post('/updatePass', [
    body('password').trim().isLength({min: 5}).withMessage('wrong password'),
    body('confirmPass').trim().isLength({min: 5}).withMessage('wrong confirm password')
], authController.updatePassword);

module.exports = router;