const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  period: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Budget', budgetSchema);