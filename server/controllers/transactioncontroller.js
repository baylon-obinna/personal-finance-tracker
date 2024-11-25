const Transaction = require('../models/Transaction');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { description, amount, date } = req.body;
    const newTransaction = new Transaction({ description, amount, date });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create transaction' });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update transaction' });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete transaction' });
  }
};