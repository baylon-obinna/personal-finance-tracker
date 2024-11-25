import { config } from './environment';
import { useState, useEffect } from 'react';
import { api, handleApiError } from '../utils/apiUtils';

// API endpoints
export const apiEndpoints = {
  auth: {
    login: '/api/users/login',
    register: '/api/users/register',
    demo: '/api/users/demo'
  },
  transactions: '/api/transactions',
  budget: '/api/budget',
  investments: '/api/investments',
  health: '/health'
};

// Helper function to get full endpoint URL
export const getApiUrl = (endpoint) => `${config.apiUrl}${endpoint}`;

// Shared data fetching hook
export const useDataFetching = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(endpoint);
        setData(Array.isArray(response) ? response : []);
        setError(null);
      } catch (err) {
        const errorResult = handleApiError(err);
        setError(errorResult.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

// Loading component
export const LoadingSpinner = () => (
  <div className="loading-spinner">
    Loading...
  </div>
);

// Error component
export const ErrorMessage = ({ message }) => (
  <div className="error-container">
    <h2>Error</h2>
    <div className="error-message">{message}</div>
  </div>
);