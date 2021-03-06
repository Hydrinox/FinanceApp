const User = require('../models/user');
const config = require('../config');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.authenticate = (req, res, next) => {
    return res.status(200).send({ message: "Authenticated" });
}

exports.signin = (req, res) => {
    //Search for Username
    User.findOne({ username: req.body.username.toUpperCase() })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found" });
            }
            //Compare entered password to stored password
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    message: "Invalid Password"
                });
            }
            //Create and Send JWT in response
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 1800 // 30 minutes
            });


            res.status(200).cookie(config.cookieName, token, { secure: true, httpOnly: true, sameSite: "strict" }).send({
                id: user.id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.logout = (req, res) => {
    res.clearCookie(config.cookieName);
    res.status(200).send({ success: true });
}

exports.register = (req, res) => {
    //Check if username already exists
    User.findOne({ username: req.body.username.toUpperCase() })
        .then(user => {
            if (user) {
                return res.status(404).send({ message: "Username already registered." });
            } else {
                //Check if email already exists
                User.findOne({ email: req.body.email })
                    .then(user => {
                        if (user) {
                            return res.status(404).send({ message: "Email already registered" })
                        } else {
                            // Save User to Database
                            User.create({
                                username: req.body.username.toUpperCase(),
                                email: req.body.email,
                                password: bcrypt.hashSync(req.body.password, 8)
                            })
                                .then(user => {
                                    res.status(200).send({ message: `${user.username} registered successfully!` });
                                })
                                .catch(err => {
                                    res.status(500).send({ message: err.message });
                                });
                        }
                    });
            }
        })
}