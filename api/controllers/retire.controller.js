const Retirement = require('../models/retirement');
const { defaultRetirement } = require('../config')

exports.findRetirement = (req, res) => {
    Retirement.find({ _id: req.params.user })
        .exec()
        .then(result => {
            //if user doesn't have retirement, save/return default retirement
            if (result.length === 0) {
                defaultRetirementItem = new Retirement({
                    currentAge: defaultRetirement.currentAge,
                    retirementAge: defaultRetirement.retirementAge,
                    startPrincipal: defaultRetirement.startPrincipal,
                    contributions: defaultRetirement.contributions,
                    growthRate: defaultRetirement.growthRate,
                    _id: req.params.user
                })
                defaultRetirementItem.save();
                result.push(defaultRetirementItem);
            }
            res.status(200).json(result[0]);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.updateRetirement = (req, res) => {
    const id = req.params.user;
    var options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const retirement = new Retirement({
        currentAge: req.body.currentAge,
        retirementAge: req.body.retirementAge,
        startPrincipal: req.body.startPrincipal,
        contributions: req.body.contributions,
        growthRate: req.body.growthRate,
        _id: req.body.user
    });
    Retirement.findOneAndUpdate({ _id: id }, retirement, options)
        .then(result => {
            res.status(200).json({
                message: "Created retirement",
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}