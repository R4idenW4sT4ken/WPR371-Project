// Routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.get('/login', authController.showLogin);
router.post('/login', authController.login);

// Register route
router.get('/register', authController.showRegister);
router.post('/register', authController.register);

// Logout route
router.get('/logout', authController.logout);

module.exports = router;