const mongoose = require('mongoose');

const retireSchema = mongoose.Schema({
    currentAge: Number,
    retirementAge: Number,
    startPrincipal: Number,
    contributions: Number,
    growthRate: Number
},
    { capped: { size: 1024, max: 1, autoIndexId: true } }
);

module.exports = mongoose.model('Retirement', retireSchema);