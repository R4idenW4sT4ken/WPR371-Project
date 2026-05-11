// Event routes

const express = require('express');
const router = express.Router();
const eventController = require('../Controllers/eventController');
const { ensureAdmin } = require('../Middleware/auth');

// List all events
router.get('/', eventController.listEvents);

// Show event detail
router.get('/:id', eventController.showEvent);

// Create new event (admin only)
router.post('/', ensureAdmin, eventController.createEvent);

module.exports = router;