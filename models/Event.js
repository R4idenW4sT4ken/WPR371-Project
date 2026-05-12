const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: '' },
  description: { type: String, default: '' },
  details: { type: String, default: '' },
  rules: { type: String, default: '' },
  bring: { type: String, default: '' },
  weather: { type: String, default: '' },
  dress: { type: String, default: '' },
  parking: { type: String, default: '' },
  accessibility: { type: String, default: '' },
  food: { type: String, default: '' },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, default: 0 },
  ticketsBooked: { type: Number, default: 0 },
  image: { type: String, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
