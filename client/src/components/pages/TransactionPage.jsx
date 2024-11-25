import React from 'react';
import { useDataFetching, apiEndpoints, LoadingSpinner, ErrorMessage } from '../../config/config';
import './shared.css';

const TransactionPage = () => {
  const { data: transactions, loading, error } = useDataFetching(apiEndpoints.transactions);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!transactions.length) {
    return (
      <div className="transactions-page">
        <h2>Transactions</h2>
        <p>No transactions found. Add your first transaction to get started!</p>
      </div>
    );
  }

  return (
    <div className="transactions-page">
      <h2>Transactions</h2>
      <ul className="transaction-list">
        {transactions.map((transaction) => (
          <li
            key={transaction._id || transaction.id || Math.random().toString()}
            className="transaction-item"
          >
            <span className="transaction-description">
              {transaction.description}
            </span>
            <span
              className={`transaction-amount ${
                transaction.type === 'income' ? 'income' : 'expense'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'}$
              {Math.abs(transaction.amount).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionPage;