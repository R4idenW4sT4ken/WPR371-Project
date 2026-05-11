/**
 * PageRoutes.js
 * All main page routes for the Community Portal.
 * Handles home, about, events, event details, contact, admin, and event management.
 * Uses in-memory arrays for events/messages (replace with DB queries for production).
 */

const express = require('express');

// Developer codes for admin actions

const validCodes = [
  "hanre-010", "hendrik-010", "mickayla-010", "teodor-010", "emmanuel-010"
];

// Helper: Get a random event for homepage
function getRandomEvent(events) {
  const index = Math.floor(Math.random() * events.length);
  return { event: events[index], index };
}

module.exports = ({ teamMembers, events, messages }) => {
  const router = express.Router();

  // Home Page - Shows a random featured event
  router.get('/', (req, res) => {
    const { event, index } = getRandomEvent(events);
    res.render('home', { featuredEvent: event, index, teamMembers });
  });

 // About Page
  router.get('/about', (req, res) => {
    res.status(200).render('about', { teamMembers });
  });

  // Events Page
  router.get('/events', (req, res) => {
    res.status(200).render('events', { events });
  });

  // Event Detail Page
  router.get('/events/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const event = events[index];

    if (!event) {
      return res.status(404).send('Event not found');
    }

    const prevIndex = index > 0 ? index - 1 : null;
    const nextIndex = index < events.length - 1 ? index + 1 : null;

    res.status(200).render('eventDetail', {
      event,
      prevIndex,
      nextIndex
    });
  });

  // Contact Page
  router.get('/contact', (req, res) => {
    res.status(200).render('contact');
  });

  // Thank You Page
  router.get('/thankyou', (req, res) => {
    res.status(200).render('thankyou');
  });

  // Admin Form Page
  router.get('/admin', (req, res) => {
    res.render('admin');
  });

  // Delete Event Page
  router.get("/delete-event", (req, res) => {
    res.render("deleteEvent", {
      events,
      message: "Choose an event to delete.",
      success: true
    });
  });


  // Delete Event POST
  router.post("/delete-event", (req, res) => {
    const { title, code } = req.body;
    if (!validCodes.includes(code.toLowerCase())) {
      return res.send("Invalid Developer Code.");
    }
    const initialLength = events.length;
    const updatedEvents = events.filter(event => event.title !== title);

    if (updatedEvents.length === initialLength) {
      return res.send("Event not found.");
    }

    // Clear and repopulate original array to preserve reference
    events.length = 0;
    updatedEvents.forEach(event => events.push(event));

    res.redirect("/");
  });

  // Delete Event (DELETE method)
  router.delete('/events/:index', (req, res) => {
    const eventID = parseInt(req.params.index);
    if (!isNaN(eventID) && eventID >= 0 && eventID < events.length) {
      events.splice(eventID, 1);
    }
    res.redirect('/events');
  });

  // 403 Access Denied Page
  router.get('/access-denied', (req, res) => {
    res.status(403).render('Errors/403');
  });

  // 404 handler for unmatched routes in this router
  router.use((req, res) => {
    res.status(404).render('Errors/404');
  });

  return router;
};