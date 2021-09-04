const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  name:  String, 
  amount: Number
});

module.exports = mongoose.model('Expense', expenseSchema);