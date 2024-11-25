import React from 'react';
import { useDataFetching, apiEndpoints, LoadingSpinner, ErrorMessage } from '../../config/config';
import './shared.css';

const BudgetPage = () => {
  const { data: budgetData, loading, error } = useDataFetching(apiEndpoints.budget);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!budgetData.length) {
    return (
      <div className="budget-page">
        <h2>Budget</h2>
        <p>No budget data found. Add your first budget item to get started!</p>
      </div>
    );
  }

  return (
    <div className="budget-page">
      <h2>Budget</h2>
      <ul className="budget-list">
        {budgetData.map((item) => (
          <li
            key={item._id || item.id || Math.random().toString()}
            className="budget-item"
          >
            <span className="budget-name">{item.name}</span>
            <span className="budget-amount">
              ${Number(item.amount).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetPage;