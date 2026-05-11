// Controller for event CRUD operations

const Event = require('../Models/Event');

// List all events
exports.listEvents = async (req, res) => {
  const events = await Event.find();
  res.render('pages/events', { events });
};

// Show event detail
exports.showEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).render('Errors/404');
  res.render('pages/eventDetail', { event });
};

// Create new event (admin only)
exports.createEvent = async (req, res) => {
  const { title, date, location, image, description, capacity } = req.body;
  await Event.create({ title, date, location, image, description, capacity, available: capacity });
  res.redirect('/events');
};