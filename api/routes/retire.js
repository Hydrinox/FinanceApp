const express = require('express');
const router = express.Router();

const Retirement = require('../models/retirement');


router.get("/:user", (req, res, next) => {
    const id = req.params.user;
    Retirement.find({ user: req.params.user })
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
    var options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const retirement = new Retirement({
        currentAge: req.body.body.currentAge,
        retirementAge: req.body.body.retirementAge,
        startPrincipal: req.body.body.startPrincipal,
        contributions: req.body.body.contributions,
        growthRate: req.body.body.growthRate,
        _id: req.body.body.user
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
});

module.exports = router;