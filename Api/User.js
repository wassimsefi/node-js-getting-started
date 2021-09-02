/***** GLOBAL IMPORTS *****/
const { hash } = require('bcrypt');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const route = express.Router();


/***** MODELS IMPORT *****/
const User = require('../DB/User');

/***** METHODES GOES HERE *****/
/* REGISTER */


route.post('/signup', (req, res, next) => {
    User.find({ userName: req.body.userName }).exec().then(user => {
        if (user >= 1) {
            return res.status(409).json({ message: 'userName Exists', });
        } else {
            bcrypt.hash(req.body.password, 10, (error, hash) => {
                if (error) {
                    return res.status(500).json({ error: error, });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        userName: req.body.userName,
                        password: hash,
                        image:req.body.image,

                    });
                    user.save().then(result => {
                        console.log(result);
                        res.status(201).json({
                            user: result,
                        });
                    }).catch(error => console.log(error));
                }
            });
        }
    });
});

/* LOGIN */
route.post('/login', (req, res, next) => {
    User.find({ image: req.body.image }).exec().then(user => {
        console.log(req.body);
        if (user.length < 1) { return res.status(401).json({ message: 'Image not found', }); }
        bcrypt.compare(req.body.password, user[0].password, (error, result) => {
            if (error) {
                return res.status(401).json({
                    message: 'Nothing to show',
                    error: error
                });
            }
            if (result) {
                console.log("this is a user" + user);
                return res.status(200).json({
                    //   _id: user[0]._id,
                    user: user[0],
                });
            }
            res.status(401).json({
                message: 'Password does not match',
            });
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: "None",
            error: error
        });
    });
});


// route.post('/', async (req, res) => {
//   const { userName, lastName } = req.body;
//   let user = {};
//   user.userName = userName;
//   user.lastName = lastName;
//   let userModel = new User(user);
//   await userModel.save();
//   res.json(userModel);
// });

module.exports = route;
