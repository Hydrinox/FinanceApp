const Expense = require('../models/expense');
const { defaultExpenses } = require('../config')

exports.findExpenses = (req, res) => {
    Expense.find({ user: req.params.user })
        .exec()
        .then(docs => {
            //if user doesn't have any expenses, save/return default expenses
            if (docs.length === 0) {
                docs = defaultExpenses;
                docs.forEach(expense => {
                    let defaultExpense = new Expense({
                        name: expense.name,
                        value: expense.value,
                        user: req.params.user
                    });
                    defaultExpense.save();
                })
            }
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.createExpense = (req, res) => {
    const expense = new Expense({
        name: req.body.name,
        value: req.body.value,
        user: req.body.user
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
}

exports.getExpense = (req, res, next) => {
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

exports.updateExpense = (req, res, next) => {
    //if expenseId is provided, update existing expense
    if (req.params.expenseId) {
        Expense.findOneAndUpdate({ _id: req.params.expenseId }, req.body)
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
        //if expenseId is not provided, create new expense
    } else {
        const expense = new Expense({
            name: req.body.name,
            value: req.body.value,
            user: req.body.user
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
    }
}

exports.deleteExpense = (req, res, next) => {
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