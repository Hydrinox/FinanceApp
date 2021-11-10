const Income = require('../models/income');
const Expense = require('../models/expense');
const Retirement = require('../models/retirement');

const { defaultIncome, defaultExpenses, defaultRetirement } = require('../config');

//if user doesn't have income, save/return default income
exports.checkIncome = (req, res, next) => {
    Income.find({ _id: req.params.user })
        .exec()
        .then(result => {
            if (result.length === 0) {
                let defaultIncomeItem = new Income({
                    frequency: defaultIncome.frequency,
                    value: defaultIncome.value,
                    _id: req.params.user
                })
                defaultIncomeItem.save()
                return res.status(200).json(defaultIncomeItem);
            }
            next();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

//if user doesn't have any expenses, save/return default expenses
exports.checkExpense = (req, res, next) => {
    Expense.find({ user: req.params.user })
        .exec()
        .then(result => {
            if (result.length === 0) {
                result = defaultExpenses;
                result.forEach(expense => {
                    let defaultExpense = new Expense({
                        name: expense.name,
                        value: expense.value,
                        user: req.params.user
                    });
                    defaultExpense.save();
                })
                return res.status(200).json(result);
            }
            next();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

//if user doesn't have any retirement saved, save/return default retirement
exports.checkRetirement = (req, res, next) => {
    Retirement.find({ _id: req.params.user })
        .exec()
        .then(result => {
            if (result.length === 0) {
                let defaultRetirementItem = new Retirement({
                    currentAge: defaultRetirement.currentAge,
                    retirementAge: defaultRetirement.retirementAge,
                    startPrincipal: defaultRetirement.startPrincipal,
                    contributions: defaultRetirement.contributions,
                    growthRate: defaultRetirement.growthRate,
                    _id: req.params.user
                });
                defaultRetirementItem.save();
                return res.status(200).json(defaultRetirementItem);
            }
            next();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};


