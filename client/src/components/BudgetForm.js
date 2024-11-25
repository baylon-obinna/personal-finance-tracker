import React, { useState } from 'react';
import './BudgetForm.css';

const BudgetForm = ({ onSetBudget }) => {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetBudget({ category, budget });
    setCategory('');
    setBudget('');
  };

  return (
    <form onSubmit={handleSubmit} className="budget-form">
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="budget-input"
      />
      <input
        type="number"
        placeholder="Budget Amount"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        required
        className="budget-input"
      />
      <button type="submit" className="budget-button">Set Budget</button>
    </form>
  );
};

export default BudgetForm;
