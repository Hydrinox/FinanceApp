const Income = require('../models/income');

exports.getIncome = (req, res) => {
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
}

exports.updateIncome = (req, res) => {
    const id = req.params.user;
    var options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const income = new Income({
        value: req.body.value,
        frequency: req.body.frequency,
        _id: req.body.user
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
}