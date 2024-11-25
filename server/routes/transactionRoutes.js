const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const auth = require('../middleware/auth');

// Get all transactions
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ date: -1 })
      .select('description amount type date'); // Only select needed fields
    
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new transaction
router.post('/', auth, async (req, res) => {
  try {
    const { description, amount, type } = req.body;

    // Validate type
    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ message: 'Type must be either income or expense' });
    }

    const transaction = new Transaction({
      description,
      amount,
      type,
      user: req.user.id
    });

    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;