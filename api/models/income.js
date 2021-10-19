const mongoose = require('mongoose');

const incomeSchema = mongoose.Schema({
  value: Number,
  frequency: String,
  _id: String
},
  { timestamps: true }
);

module.exports = mongoose.model('Income', incomeSchema);