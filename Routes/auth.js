<<<<<<< HEAD
=======
// Routes/auth.js
>>>>>>> origin/main
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

<<<<<<< HEAD
router.get('/login', authController.showLogin);
router.post('/login', authController.login);

router.get('/register', authController.showRegister);
router.post('/register', authController.register);

router.get('/logout', authController.logout);

module.exports = router;
=======
// Login route
router.get('/login', authController.showLogin);
router.post('/login', authController.login);

// Register route
router.get('/register', authController.showRegister);
router.post('/register', authController.register);

// Logout route
router.get('/logout', authController.logout);

module.exports = router;
>>>>>>> origin/main
