const config = require('../config');
var jwt = require("jsonwebtoken");


verifyToken = (req, res) => {
    //Check token is present is request
    let token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send({
            message: "Missing Token"
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
            message: "Unauthorized"
        });
    });
}

module.exports = verifyToken;