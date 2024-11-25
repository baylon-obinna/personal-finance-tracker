const Budget = require('../models/budget');

exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch budgets' });
  }
};

exports.createBudget = async (req, res) => {
  try {
    const { category, amount, period } = req.body;
    const newBudget = new Budget({ category, amount, period });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create budget' });
  }
};

exports.updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBudget = await Budget.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBudget) {
      return res.status(404).json({ error: 'Budget not found' });
    }
    res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update budget' });
  }
};

exports.deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBudget = await Budget.findByIdAndDelete(id);
    if (!deletedBudget) {
      return res.status(404).json({ error: 'Budget not found' });
    }
    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete budget' });
  }
};