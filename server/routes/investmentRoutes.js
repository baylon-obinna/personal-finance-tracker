const express = require('express');
const router = express.Router();
const investmentController = require('../controllers/investmentcontroller');
const auth = require('../middleware/auth');

router.get('/', investmentController.getInvestments);

// Create a new investment entry
router.post('/', auth, async (req, res) => {
  try {
    const { name, type, amount, date } = req.body;
    if (!name || !type || !amount || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newInvestment = new Investment({ name, type, amount, date });
    await newInvestment.save();
    res.status(201).json(newInvestment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create investment entry' });
  }
});


// Get all investment entries
router.get('/', auth, async (req, res) => {
  try {
    const investments = await Investment.find();
    res.status(200).json(investments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch investments' });
  }
});

// Update an investment entry by ID
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInvestment = await Investment.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedInvestment) {
      return res.status(404).json({ error: 'Investment entry not found' });
    }
    res.status(200).json(updatedInvestment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update investment entry' });
  }
});

// Delete an investment entry by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvestment = await Investment.findByIdAndDelete(id);
    if (!deletedInvestment) {
      return res.status(404).json({ error: 'Investment entry not found' });
    }
    res.status(200).json({ message: 'Investment entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete investment entry' });
  }
});

module.exports = router;
