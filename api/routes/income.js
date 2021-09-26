const express = require('express');
const router = express.Router();

const Expense = require('../models/income');


router.get("/", (req, res, next) => {
  Expense.find()
    .exec()
    .then(result => {
      res.status(200).json(result[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const expense = new Expense({
    value: req.body.body.value,
    frequency: req.body.body.frequency
  });
  expense
    .save()
    .then(result => {
      res.status(200).json({
        message: "Created income",
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;