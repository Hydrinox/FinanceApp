const config = require('../config');
var jwt = require("jsonwebtoken");


verifyToken = (req, res, next) => {
    //Check token is present is request
    let token = req.cookies[config.cookieName]
    if (!token) {
        return res.status(403).send({
            message: "Missing Token"
        });
    }

    try {
        //Verifies JWT is valid
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized"
                });
            }
            next();
        });
    }
    catch (e) {
        //incase of expired jwt or invalid token, kill the token and clear the cookie
        res.clearCookie(config.cookieName);
        return res.status(400).send(e.message);
    }
}

module.exports = verifyToken;