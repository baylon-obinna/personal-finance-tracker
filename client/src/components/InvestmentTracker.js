import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiUrl from '../config/config';
import './InvestmentTracker.css';

const InvestmentTracker = () => {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const fetchInvestments = async () => {
      const res = await axios.get(`${apiUrl}/api/investments`);
      setInvestments(res.data);
    };
    fetchInvestments();
  }, []);

  return (
    <div className="investment-tracker">
      <h2>Investment Portfolio</h2>
      <ul className="investment-list">
        {investments.map(inv => (
          <li key={inv.id} className="investment-item">
            <span className="investment-name">{inv.name}</span>: 
            <span className="investment-value"> ${inv.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvestmentTracker;
