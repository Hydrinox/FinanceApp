const express = require('express');
const router = express.Router();
const controller = require('../controllers/income.controller');

router.get("/:user", controller.getIncome);

router.put("/:user", controller.updateIncome);

module.exports = router;