import React from 'react';
import { useDataFetching, apiEndpoints, LoadingSpinner, ErrorMessage } from '../../config/config';
import './shared.css';

const InvestmentPage = () => {
  const { data: investments, loading, error } = useDataFetching(apiEndpoints.investments);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!investments.length) {
    return (
      <div className="investment-page">
        <h2>Investments</h2>
        <p>No investments found. Start tracking your investments today!</p>
      </div>
    );
  }

  return (
    <div className="investment-page">
      <h2>Investments</h2>
      <ul className="investment-list">
        {investments.map((investment) => (
          <li
            key={investment._id || investment.id || Math.random().toString()}
            className="investment-item"
          >
            <span className="investment-name">{investment.name}</span>
            <span className="investment-amount">
              ${Number(investment.amount).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvestmentPage;