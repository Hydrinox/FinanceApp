const express = require('express');
const router = express.Router();

const Expense = require('../models/income');


router.get("/", (req, res, next) => {
  Expense.find()
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
      value: req.body.body.value,
      frequency: req.body.body.frequency
    });
    expense
      .save()
      .then(result => {
        res.status(200).json({
          message: "Created income",
          createdExpense: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

  router.patch("/:incomeId", (req, res, next) => {
    const id = req.params.incomeId;
    Expense.findOneAndUpdate({_id: id}, req.body.body)
    .exec()
    .then(doc => {
      if(doc){
        res.status(200).json(doc);
      } else {
        res  
          .status(400)
          .json({ message: "no income found for this id"});
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    })
  })

  router.delete("/:incomeId", (req, res, next) => {
    const id = req.params.incomeId;
      Expense.findByIdAndRemove(id)
      .exec()
      .then(doc => {
        if(doc){
          res
          .status(200)
          .json({ body: doc, message: "income deleted"});
        } else {
          res  
            .status(400)
            .json({ message: "no income found for this id"});
        }
      }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      })
    }
  );


module.exports = router;