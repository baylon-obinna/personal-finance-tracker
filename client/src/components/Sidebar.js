import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiHome, 
  FiCreditCard, 
  FiBarChart2,
  FiPieChart 
} from 'react-icons/fi';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/" className="icon">
        <FiHome />
        <span className="icon-label">Dashboard</span>
      </Link>
      
      <Link to="/transactions" className="icon">
        <FiCreditCard />
        <span className="icon-label">Transactions</span>
      </Link>
      
      <Link to="/investments" className="icon">
        <FiBarChart2 />
        <span className="icon-label">Investments</span>
      </Link>
      
      <Link to="/budget" className="icon">
        <FiPieChart />
        <span className="icon-label">Budget</span>
      </Link>
    </div>
  );
}

export default Sidebar;