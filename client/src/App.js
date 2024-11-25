import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BudgetPage from './components/pages/BudgetPage';
import TransactionPage from './components/pages/TransactionPage';
import InvestmentPage from './components/pages/InvestmentPage';
import Dashboard from './components/Dashboard';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budget"
          element={
            <ProtectedRoute>
              <BudgetPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/investments"
          element={
            <ProtectedRoute>
              <InvestmentPage />
            </ProtectedRoute>
          }
        />

        {/* Redirect all unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;