const express = require('express');
const router = express.Router();
const { registerUser, loginUser, loginDemo } = require('../controllers/authcontroller');
const { body } = require('express-validator');

// Validation middleware
const registerValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .trim(),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .trim()
];

// Debug logging middleware
const logRequest = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  console.log('Request body:', req.body);
  next();
};

// Routes
/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 * @returns {Object} User data and JWT token
 */
router.post('/register', logRequest, registerValidation, registerUser);

/**
 * @route   POST /api/users/login
 * @desc    Login user and return JWT token
 * @access  Public
 * @returns {Object} User data and JWT token
 */
router.post('/login', logRequest, loginValidation, loginUser);

/**
 * @route   POST /api/users/demo
 * @desc    Login with demo account
 * @access  Public
 * @returns {Object} Demo user data and JWT token
 */
router.post('/demo', logRequest, loginDemo);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Auth service is running' });
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error('Auth route error:', err);
  res.status(500).json({
    error: true,
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

module.exports = router;