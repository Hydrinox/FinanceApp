const express = require('express');
const router = express.Router();

const Expense = require('../models/expense');


router.get("/", (req, res, next) => {
  Expense.find()
    .exec()
    .then(docs => {
      console.log(docs);
      //   if (docs.length >= 0) {
      res.status(200).json(docs);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
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
    name: req.body.expense.name,
    amount: req.body.expense.amount
  });
  console.log("body that was passed: ", req);
  expense
    .save()
    .then(result => {
      console.log("createdExpense: ", result);
      res.status(200).json({
        message: "Created new expense",
        createdExpense: result
      });
    })
    .catch(err => {
      console.log(err);
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
      if(doc){
        res.status(200).json(doc);
      } else {
        res  
          .status(400)
          .json({ message: "no expense found for this id"});
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
  }
);

router.patch("/:expenseId", (req, res, next) => {
  const id = req.params.expenseId;
  Expense.findOneAndUpdate({_id: id}, req.body.updatedExpense)
  .exec()
  .then(doc => {
    if(doc){
      res.status(200).json(doc);
    } else {
      res  
        .status(400)
        .json({ message: "no expense found for this id"});
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
    .then(doc => {
      if(doc){
        res
        .status(200)
        .json({ body: doc, message: "expense deleted"});
      } else {
        res  
          .status(400)
          .json({ message: "no expense found for this id"});
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
  }
);

module.exports = router;
