const express = require('express');
const router = express.Router();

const Expense = require('../models/expense');


router.get("/", (req, res, next) => {
//   Expense.aggregate([
//     {
//         $group: {
//         _id: null,
//         sum:{$sum:"$amount"},
//         expenses:{$push:{_id:"$_id", name:"$name", amount:"$amount"}}
//         }
//     },
//     {
//         $unwind: {
//             path : "$expenses",
//         }
//     },
//     {
//         $project: {
//           _id: "$expenses._id",
//           name:"$expenses.name",
//           amount:"$expenses.amount",
//           sum:"$sum",
//             "percent": {$multiply:[{$divide:["$expenses.amount","$sum"]},100]}
//         }
//     },
// ]).then(docs => {
//     res.status(200).json(docs);
//   }).catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
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
  console.log(req);
  const expense = new Expense({
    name: req.body.body.name,
    amount: req.body.body.amount
  });
  expense
    .save()
    .then(result => {
      res.status(200).json({
        message: "Created new expense",
        createdExpense: result
      });
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
  console.log("this is request bodyddddd", req);
  Expense.findOneAndUpdate({_id: id}, req.body.body)
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
