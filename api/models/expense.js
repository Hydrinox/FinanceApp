const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
  name: String,
  value: Number,
  user: String
},
  { timestamps: true }
);

module.exports = mongoose.model('Expense', expenseSchema);