const express = require('express');
const router = express.Router();
const controller = require('../controllers/expense.controller');
const verifyToken = require('../middleware/verifyToken')


router.get("/:user", controller.findExpenses);

router.post("/", controller.createExpense);

router.get("/:expenseId", controller.getExpense);

router.patch("/:expenseId", controller.updateExpense)

router.delete("/:expenseId", controller.deleteExpense);

module.exports = router;
