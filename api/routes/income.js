const express = require('express');
const router = express.Router();
const checkExistingIncome = require('../middleware/checkEntryExists')
const controller = require('../controllers/income.controller');

router.get("/:user", checkExistingIncome.checkIncome, controller.getIncome);

router.put("/:user", controller.updateIncome);

module.exports = router;