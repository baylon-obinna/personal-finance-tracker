import React, { useState } from 'react';
import './TransactionForm.css';


const TransactionForm = ({ onAddTransaction }) => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTransaction({ date, amount, category });
    setDate('');
    setAmount('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
