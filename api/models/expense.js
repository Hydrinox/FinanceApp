const mongoose = require('mongoose');

const expenseSchema =  mongoose.Schema({
  name:  String, 
  amount: Number
},
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);