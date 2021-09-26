const express = require('express');
const router = express.Router();

const Retirement = require('../models/retirement');


router.get("/", (req, res, next) => {
    Retirement.find()
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

router.post("/", (req, res, next) => {
    const retirement = new Retirement({
        currentAge: req.body.body.currentAge,
        retirementAge: req.body.body.retirementAge,
        startPrincipal: req.body.body.startPrincipal,
        contributions: req.body.body.contributions,
        growthRate: req.body.body.growthRate
    });
    retirement
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

module.exports = router;