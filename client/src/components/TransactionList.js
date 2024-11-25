import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiUrl from '../config/config';
import './TransactionsList.css';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await axios.get(`${apiUrl}/api/transactions`);
      setTransactions(res.data);
    };
    fetchTransactions();
  }, []);

  return (
    <ul>
      {transactions.map((tx) => (
        <li key={tx.id}>
          {tx.date} - {tx.category}: ${tx.amount}
        </li>
      ))}
    </ul>
  );
};

export default TransactionsList;
