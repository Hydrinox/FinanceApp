const express = require('express');
const router = express.Router();

const Expense = require('../models/expense');


router.get("/:user", (req, res, next) => {
  Expense.find({ user: req.params.user })
    .exec()
    .then(docs => {
      res.status(200).json(docs);
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
    name: req.body.body.name,
    value: req.body.body.value,
    user: req.body.body.user
  });
  expense
    .save()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:expenseId", (req, res, next) => {
  const id = req.params.expenseId;
  Expense.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(400)
          .json({ message: "no expense found for this id" });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
}
);

router.patch("/:expenseId", (req, res, next) => {
  const id = req.params.expenseId;
  Expense.findOneAndUpdate({ _id: id }, req.body.body)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(400)
          .json({ message: "no expense found for this id" });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
})

router.delete("/:expenseId", (req, res, next) => {
  const id = req.params.expenseId;
  Expense.findByIdAndRemove(id)
    .exec()
    .then(result => {
      if (result) {
        res
          .status(200)
          .json(result);
      } else {
        res
          .status(400)
          .json({ message: "no expense found for this id" });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
}
);

module.exports = router;
