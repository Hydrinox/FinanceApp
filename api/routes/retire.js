const express = require('express');
const router = express.Router();
const checkExistingRetirement = require('../middleware/checkEntryExists')
const controller = require('../controllers/retire.controller');

router.get("/:user", checkExistingRetirement.checkRetirement, controller.findRetirement);

router.put("/:user", controller.updateRetirement);

module.exports = router;