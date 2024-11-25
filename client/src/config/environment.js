const environment = {
    development: {
      apiUrl: 'http://localhost:5000',
    },
    production: {
      apiUrl: process.env.REACT_APP_API_URL,
    },
    test: {
      apiUrl: 'http://localhost:5000',
    }
  };
  
  const currentEnv = process.env.NODE_ENV || 'development';
  
  export const config = environment[currentEnv];