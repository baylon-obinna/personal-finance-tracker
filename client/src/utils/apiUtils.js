// Base API URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Main authenticated fetch function
export const authenticatedFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  // Prepare headers
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  });

  // Add auth token if available
  if (token) {
    headers.set('x-auth-token', token);
  }

  // Prepare final request options
  const requestOptions = {
    ...options,
    headers,
    mode: 'cors',
    credentials: 'include',
  };

  try {
    console.log('Sending request to:', url, requestOptions); // Debug log
    const response = await fetch(url, requestOptions);
    
    // Debug response
    console.log('Response status:', response.status);
    console.log('Response headers:', [...response.headers.entries()]);

    return handleResponse(response);
  } catch (error) {
    console.error('API request failed:', error);
    throw new Error(error.message || 'Network error occurred');
  }
};

// Enhanced response handler
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message;
    } catch {
      errorMessage = `HTTP error! status: ${response.status}`;
    }

    // Enhanced error handling
    switch (response.status) {
      case 401:
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Authentication required');
      case 403:
        throw new Error('Access forbidden');
      case 404:
        throw new Error('Resource not found');
      case 500:
        throw new Error('Server error: ' + errorMessage);
      default:
        throw new Error(errorMessage);
    }
  }

  try {
    return await response.json();
  } catch (error) {
    if (response.status === 204) {
      return null; // No content
    }
    throw new Error('Invalid JSON response');
  }
};

// API helper functions
export const api = {
  get: (endpoint) => authenticatedFetch(endpoint, { method: 'GET' }),
  
  post: (endpoint, data) => authenticatedFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  put: (endpoint, data) => authenticatedFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  delete: (endpoint) => authenticatedFetch(endpoint, { method: 'DELETE' }),
};

// Usage example for transactions
export const transactionApi = {
  getAll: () => api.get('/transactions'),
  getById: (id) => api.get(`/transactions/${id}`),
  create: (data) => api.post('/transactions', data),
  update: (id, data) => api.put(`/transactions/${id}`, data),
  delete: (id) => api.delete(`/transactions/${id}`),
};

// Auth related functions
export const authApi = {
  login: (credentials) => api.post('/users/login', credentials),
  register: (userData) => api.post('/users/register', userData),
  getCurrentUser: () => api.get('/users/me'),
};

// Error handler utility
export const handleApiError = (error) => {
  console.error('API Error:', error);
  return {
    error: true,
    message: error.message || 'An unexpected error occurred'
  };
};