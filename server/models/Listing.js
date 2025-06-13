const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  price: Number,
  images: [String],
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bookedDates: [{ start: Date, end: Date }],
});

module.exports = mongoose.model('Listing', listingSchema);
