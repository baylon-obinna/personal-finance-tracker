import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { apiEndpoints, getApiUrl } from '../../config/config';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking');
  const navigate = useNavigate();

  useEffect(() => {
    const checkServerAndAuth = async () => {
      // Check for existing token
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch(getApiUrl(apiEndpoints.health), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          setServerStatus('online');
        } else {
          throw new Error('Server is not responding properly');
        }
      } catch (err) {
        setServerStatus('offline');
        setError('Unable to connect to server. Please check your connection.');
        console.error('Server check failed:', err);
      }
    };

    checkServerAndAuth();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = () => {
    const { email, password } = formData;
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (serverStatus === 'offline') {
      setError('Cannot login while server is offline. Please try again later.');
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(getApiUrl(apiEndpoints.auth.login), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        // Optional: store user data
        if (data.user) {
          localStorage.setItem('userData', JSON.stringify(data.user));
        }
        navigate('/');
      } else {
        handleErrorResponse(response.status, data);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please check your connection and try again.');
      setServerStatus('offline');
    } finally {
      setLoading(false);
    }
  };

  const handleErrorResponse = (status, data) => {
    switch (status) {
      case 400:
        setError(data.message || 'Invalid request. Please check your input.');
        break;
      case 401:
        setError('Invalid email or password');
        break;
      case 404:
        setError('Account not found. Please check your credentials.');
        break;
      case 429:
        setError('Too many login attempts. Please try again later.');
        break;
      case 500:
        setError('Server error. Please try again later.');
        break;
      default:
        setError(data.message || 'Login failed. Please try again.');
    }
  };

  const handleDemoLogin = async () => {
    if (serverStatus === 'offline') {
      setError('Cannot access demo while server is offline. Please try again later.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(getApiUrl(apiEndpoints.auth.demo), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('userData', JSON.stringify(data.user));
        }
        navigate('/');
      } else {
        setError('Demo login failed. Please try again later.');
      }
    } catch (err) {
      console.error('Demo login error:', err);
      setError('Failed to connect to server');
      setServerStatus('offline');
    } finally {
      setLoading(false);
    }
  };

  if (serverStatus === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md p-6">
          <CardContent className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Connecting to server...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-center text-3xl font-bold tracking-tight">Login</h2>
        </CardHeader>
        
        <CardContent>
          {serverStatus === 'offline' && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Server is currently offline. Please try again later.</AlertTitle>
            </Alert>
          )}
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email:
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
                disabled={loading || serverStatus === 'offline'}
                className="w-full"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password:
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Enter your password"
                disabled={loading || serverStatus === 'offline'}
                className="w-full"
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || serverStatus === 'offline'}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            variant="outline"
            onClick={handleDemoLogin}
            disabled={loading || serverStatus === 'offline'}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading Demo...
              </>
            ) : (
              'Try Demo Account'
            )}
          </Button>

          <div className="text-sm text-center">
            New user?{' '}
            <Link 
              to="/register" 
              className="font-semibold text-blue-600 hover:text-blue-500"
              tabIndex={loading || serverStatus === 'offline' ? -1 : 0}
            >
              Create an account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;