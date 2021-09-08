const mongoose = require('mongoose');

const incomeSchema =  mongoose.Schema({
  amount: Number
},
  { timestamps: true }
);

module.exports = mongoose.model('Income', incomeSchema);