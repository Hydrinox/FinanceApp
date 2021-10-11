const mongoose = require('mongoose');

const incomeSchema = mongoose.Schema({
  value: Number,
  frequency: String,
  _id: String
});

module.exports = mongoose.model('Income', incomeSchema);