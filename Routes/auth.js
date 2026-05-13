/*

Role 2: Backend Developer
Pages/Files:

routes/auth.js
routes/events.js
routes/bookings.js
middleware/auth.js
controllers/ (if using MVC)
Example: routes/auth.js

*/


// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login route
router.get('/login', authController.showLogin);
router.post('/login', authController.login);

// Register route
router.get('/register', authController.showRegister);
router.post('/register', authController.register);

router.get('/logout', authController.logout);

module.exports = router;