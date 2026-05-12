const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  date: Date,
  location: String,
  capacity: Number,
  ticketsBooked: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});