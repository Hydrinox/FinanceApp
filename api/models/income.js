const mongoose = require('mongoose');

const incomeSchema =  mongoose.Schema({
  amount: Number,
  frequency: String
},
  { timestamps: true }
);

module.exports = mongoose.model('Income', incomeSchema);