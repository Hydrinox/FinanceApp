const express = require('express');
const router = express.Router();
const User = require('../models/user');
const config = require('../config');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

router.post('/auth/signin', (req, res) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });


            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                authToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

router.post('/auth/register', (req, res) => {
    //Check if user exists
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                return res.status(200).send({ message: "User already registered." });
            } else {
                // Save User to Database
                User.create({
                    username: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 8)
                })
                    .then(user => {
                        res.send({ message: `${user.username} registered successfully!` });
                    })
                    .catch(err => {
                        res.status(500).send({ message: err.message });
                    });
            }
        })
});

router.get('/auth/authenticate', (req, res) => {
    //Get token from request
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    //Check that decoded token matches username
    jwt.verify(req.headers["authorization"].split(" ")[1], config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: err
            });
        }
        if (req.userId = decoded.id) {
            return res.status(200).send({ message: "User Authenticated" });
        }
        return res.status(401).send({
            message: "Unauthorized!"
        });
    });
});

module.exports = router;
