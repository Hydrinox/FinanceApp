const express = require('express');
const router = express.Router();
const controller = require('../controllers/expense.controller');


router.get("/:user", controller.findExpenses);

router.post("/", controller.createExpense);

router.get("/:expenseId", controller.getExpense);

//router.patch("/:expenseId", controller.updateExpense)

router.delete("/:expenseId", controller.deleteExpense);

router.put("/:expenseId?", controller.updateExpense);


module.exports = router;
