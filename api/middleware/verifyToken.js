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

    jwt.verify(req.headers["authorization"].split(" ")[1], config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        console.log("this is decoded", decoded)
        req.userId = decoded.id
        next();
    });
}

module.exports = verifyToken;