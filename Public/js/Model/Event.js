// Mongoose schema for events

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: String,
  description: String,
  image: String,
  capacity: { type: Number, required: true },
  available: { type: Number, required: true }
});

module.exports = mongoose.model('Event', eventSchema);