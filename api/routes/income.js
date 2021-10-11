const express = require('express');
const router = express.Router();
var passport = require('passport');
require('../passport-setup');


const Income = require('../models/income');


router.get("/:user", (req, res, next) => {
  Income.find({ _id: req.params.user })
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

router.put("/:user", (req, res, next) => {
  const id = req.params.user;
  var query = {},
    options = { upsert: true, new: true, setDefaultsOnInsert: true };
  const income = new Income({
    value: req.body.body.value,
    frequency: req.body.body.frequency,
    _id: req.body.body.user
  });
  Income.findOneAndUpdate({ _id: id }, income, options)
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