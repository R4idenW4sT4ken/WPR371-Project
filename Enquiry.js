const enquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});



email: {
  type: String,
  required: true,
  match: [/^\S+@\S+\.\S+$/, 'Invalid email']
}