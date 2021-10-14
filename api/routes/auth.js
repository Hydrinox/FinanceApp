const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const controller = require('../controllers/auth.controller')

router.post('/auth/signin', controller.signin);

router.post('/auth/register', controller.register);

router.get('/auth/authenticate', verifyToken);

module.exports = router;
