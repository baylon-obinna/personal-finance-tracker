const Investment = require('../models/investment');

exports.getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find();
    res.status(200).json(investments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch investments' });
  }
};

exports.createInvestment = async (req, res) => {
  try {
    const { name, type, amount, date } = req.body;
    const newInvestment = new Investment({ name, type, amount, date });
    await newInvestment.save();
    res.status(201).json(newInvestment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create investment' });
  }
};

exports.updateInvestment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInvestment = await Investment.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedInvestment) {
      return res.status(404).json({ error: 'Investment not found' });
    }
    res.status(200).json(updatedInvestment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update investment' });
  }
};

exports.deleteInvestment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvestment = await Investment.findByIdAndDelete(id);
    if (!deletedInvestment) {
      return res.status(404).json({ error: 'Investment not found' });
    }
    res.status(200).json({ message: 'Investment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete investment' });
  }
};