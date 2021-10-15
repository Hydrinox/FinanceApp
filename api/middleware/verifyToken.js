const config = require('../config');
var jwt = require("jsonwebtoken");


verifyToken = (req, res, next) => {
    //Check token is present is request
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send({
            message: "Missing Token"
        });
    }

    //Verifies JWT is valid
    jwt.verify(req.headers["authorization"].split(" ")[1], config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        next();
    });
}

module.exports = verifyToken;