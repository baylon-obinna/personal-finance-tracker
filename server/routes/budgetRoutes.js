const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetcontroller');
const auth = require('../middleware/auth');

router.get('/', budgetController.getBudgets);

// Import any required models or controllers
const Budget = require('../models/budget'); // Assuming you have a Budget model

// Create a new budget entry
router.post('/', auth, async (req, res) => {
  try {
    const { category, amount, period } = req.body;
    if (!category || !amount || !period) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newBudget = new Budget({ category, amount, period });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create budget entry' });
  }
});


// Get all budget entries
router.get('/', auth, async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch budgets' });
  }
});

// Update a budget entry by ID
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBudget = await Budget.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBudget) {
      return res.status(404).json({ error: 'Budget entry not found' });
    }
    res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update budget entry' });
  }
});

// Delete a budget entry by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBudget = await Budget.findByIdAndDelete(id);
    if (!deletedBudget) {
      return res.status(404).json({ error: 'Budget entry not found' });
    }
    res.status(200).json({ message: 'Budget entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete budget entry' });
  }
});

module.exports = router;
