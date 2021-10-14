const express = require('express');
const router = express.Router();
const controller = require('../controllers/retire.controller');

router.get("/:user", controller.findRetirement);

router.put("/:user", controller.updateRetirement);

module.exports = router;