const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const controller = require('../controllers/auth.controller')

router.post("/signin", controller.signin);

router.post("/register", controller.register);

router.get("/authenticate", [verifyToken], controller.authenticate);

module.exports = router;
