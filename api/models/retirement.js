const mongoose = require('mongoose');

const retireSchema = mongoose.Schema({
    currentAge: Number,
    retirementAge: Number,
    startPrincipal: Number,
    contributions: Number,
    growthRate: Number,
    _id: String
},
    { timestamps: true }
);

module.exports = mongoose.model('Retirement', retireSchema);