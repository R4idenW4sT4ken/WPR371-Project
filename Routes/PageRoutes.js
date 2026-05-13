const express = require('express');
const mongoose = require('mongoose');
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const Event = require('../models/Event');
const Enquiry = require('../models/Enquiry');
const Booking = require('../models/Booking');
const User = require('../models/User');

function getRandomEvent(events) {
  if (!events || events.length === 0) {
    return null;
  }
  const index = Math.floor(Math.random() * events.length);
  return events[index];
}

module.exports = ({ teamMembers }) => {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      const events = await Event.find().sort({ date: 1 }).lean();
      const featuredEvent = getRandomEvent(events);
      res.render('pages/home', { featuredEvent, teamMembers });
    } catch (err) {
      next(err);
    }
  });

  router.get('/about', (req, res) => {
    res.status(200).render('pages/about', { teamMembers });
  });

  router.get('/events', async (req, res, next) => {
    try {
      const events = await Event.find().sort({ date: 1 }).lean();
      res.status(200).render('pages/events', { events });
    } catch (err) {
      next(err);
    }
  });

  router.get('/events/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).render('Errors/404');
      }

      const event = await Event.findById(id).lean();
      if (!event) {
        return res.status(404).render('Errors/404');
      }

      const prevEvent = await Event.findOne({ date: { $lt: event.date } }).sort({ date: -1 }).lean();
      const nextEvent = await Event.findOne({ date: { $gt: event.date } }).sort({ date: 1 }).lean();
      const availableTickets = event.capacity > 0 ? Math.max(0, event.capacity - event.ticketsBooked) : null;
      res.status(200).render('pages/eventDetail', {
        event,
        prevEvent,
        nextEvent,
        availableTickets
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/events/:id/book', isAuthenticated, async (req, res, next) => {
    try {
      const { id } = req.params;
      const { tickets } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).render('Errors/404');
      }

      const event = await Event.findById(id);
      if (!event) {
        return res.status(404).render('Errors/404');
      }

      const requestedTickets = parseInt(tickets, 10) || 1;
      if (requestedTickets < 1) {
        return res.status(400).send('Please choose at least one ticket.');
      }

      if (event.capacity > 0 && event.ticketsBooked + requestedTickets > event.capacity) {
        return res.status(400).send('Not enough tickets available.');
      }

      const booking = new Booking({
        user: req.session.user.id,
        event: event._id,
        tickets: requestedTickets
      });
      await booking.save();

      event.ticketsBooked += requestedTickets;
      await event.save();

      res.redirect('/bookings');
    } catch (err) {
      next(err);
    }
  });

  router.get('/bookings', isAuthenticated, async (req, res, next) => {
    try {
      const bookings = await Booking.find({ user: req.session.user.id }).populate('event').lean();
      const bookingList = bookings.map(booking => ({
        eventTitle: booking.event?.title || 'Unknown Event',
        date: booking.event?.date ? booking.event.date.toISOString().slice(0, 10) : 'Unknown Date',
        status: 'Confirmed',
        tickets: booking.tickets
      }));

      res.render('Bookings/Bookings', { bookings: bookingList });
    } catch (err) {
      next(err);
    }
  });

  router.get('/contact', (req, res) => {
    res.status(200).render('pages/contact');
  });

  router.post('/contact', async (req, res, next) => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).send('Please fill in all required fields.');
      }

      await Enquiry.create({ name, email, message });
      res.redirect('/thankyou');
    } catch (err) {
      next(err);
    }
  });

  router.get('/thankyou', (req, res) => {
    res.status(200).render('pages/thankyou');
  });

  router.get('/admin', isAdmin, (req, res) => {
    res.redirect('/admin/events');
  });

  router.get('/admin/events', isAdmin, async (req, res, next) => {
    try {
      const events = await Event.find().sort({ date: 1 }).lean();
      res.render('pages/adminEvents', { events });
    } catch (err) {
      next(err);
    }
  });

  router.get('/admin/events/new', isAdmin, (req, res) => {
    res.render('pages/admin', { formData: {}, errors: [] });
  });

  router.post('/admin/events', isAdmin, async (req, res, next) => {
    try {
      const {
        title,
        category,
        date,
        location,
        capacity,
        image,
        description,
        details,
        rules,
        bring,
        weather,
        dress,
        parking,
        accessibility,
        food
      } = req.body;

      const errors = [];
      if (!title) errors.push('Title is required.');
      if (!date) errors.push('Date is required.');
      if (!location) errors.push('Location is required.');
      if (!image) errors.push('Image URL is required.');

      if (errors.length > 0) {
        return res.status(400).render('pages/admin', { formData: req.body, errors });
      }

      await Event.create({
        title,
        category,
        date,
        location,
        capacity: parseInt(capacity, 10) || 0,
        image,
        description,
        details,
        rules,
        bring,
        weather,
        dress,
        parking,
        accessibility,
        food,
        ticketsBooked: 0,
        createdBy: req.session.user.id
      });

      res.redirect('/admin/events');
    } catch (err) {
      next(err);
    }
  });

  router.get('/admin/events/:id/edit', isAdmin, async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).render('Errors/404');
      }
      const event = await Event.findById(id).lean();
      if (!event) {
        return res.status(404).render('Errors/404');
      }
      res.render('pages/editEvent', { event, errors: [] });
    } catch (err) {
      next(err);
    }
  });

  router.put('/admin/events/:id', isAdmin, async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).render('Errors/404');
      }

      const {
        title,
        category,
        date,
        location,
        capacity,
        image,
        description,
        details,
        rules,
        bring,
        weather,
        dress,
        parking,
        accessibility,
        food
      } = req.body;

      const errors = [];
      if (!title) errors.push('Title is required.');
      if (!date) errors.push('Date is required.');
      if (!location) errors.push('Location is required.');
      if (!image) errors.push('Image URL is required.');

      if (errors.length > 0) {
        const event = await Event.findById(id).lean();
        return res.status(400).render('pages/editEvent', { event: { ...event, ...req.body }, errors });
      }

      await Event.findByIdAndUpdate(id, {
        title,
        category,
        date,
        location,
        capacity: parseInt(capacity, 10) || 0,
        image,
        description,
        details,
        rules,
        bring,
        weather,
        dress,
        parking,
        accessibility,
        food
      });

      res.redirect('/admin/events');
    } catch (err) {
      next(err);
    }
  });

  router.delete('/admin/events/:id', isAdmin, async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).render('Errors/404');
      }
      await Event.findByIdAndDelete(id);
      res.redirect('/admin/events');
    } catch (err) {
      next(err);
    }
  });

  router.get('/admin/users', isAdmin, async (req, res, next) => {
    try {
      const users = await User.find().sort({ createdAt: -1 }).lean();
      res.render('pages/adminUsers', { users });
    } catch (err) {
      next(err);
    }
  });

  router.put('/admin/users/:id/role', isAdmin, async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).render('Errors/404');
      }
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).render('Errors/404');
      }
      if (user.role === 'admin') {
        user.role = 'user';
      } else {
        user.role = 'admin';
      }
      await user.save();
      res.redirect('/admin/users');
    } catch (err) {
      next(err);
    }
  });

  router.delete('/admin/users/:id', isAdmin, async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).render('Errors/404');
      }
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).render('Errors/404');
      }
      if (req.session.user.id === user._id.toString()) {
        return res.status(400).send('Admin users cannot delete themselves.');
      }
      await User.findByIdAndDelete(id);
      res.redirect('/admin/users');
    } catch (err) {
      next(err);
    }
  });

  router.get('/access-denied', (req, res) => {
    res.status(403).render('Errors/403');
  });

  router.get('/dashboard', isAuthenticated, async (req, res, next) => {
    try {
      const totalEvents = await Event.countDocuments();
      const totalUsers = await User.countDocuments();
      const totalBookings = await Booking.countDocuments();
      const stats = { totalEvents, totalUsers, totalBookings };
      res.render('Dashboard/Dashboard', { stats });
    } catch (err) {
      next(err);
    }
  });

  router.use((req, res) => {
    res.status(404).render('Errors/404');
  });

  return router;
};