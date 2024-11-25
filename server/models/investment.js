const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Investment', investmentSchema);