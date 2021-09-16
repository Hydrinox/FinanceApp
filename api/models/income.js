const mongoose = require('mongoose');

const incomeSchema =  mongoose.Schema({
  value: Number,
  frequency: String
},
{ capped: { size: 1024, max: 1, autoIndexId: true } }
);

module.exports = mongoose.model('Income', incomeSchema);