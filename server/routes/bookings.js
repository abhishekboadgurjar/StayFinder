const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const auth = require('../middleware/auth');

// Book a listing
router.post('/', auth, async (req, res) => {
  const { listingId, checkIn, checkOut } = req.body;

  const booking = new Booking({
    listingId,
    userId: req.user.id,
    checkIn,
    checkOut,
  });

  // Optional: block dates in listing
  await Listing.findByIdAndUpdate(listingId, {
    $push: { bookedDates: { start: checkIn, end: checkOut } },
  });

  await booking.save();
  res.status(201).json({ message: 'Booking confirmed', booking });
});

module.exports = router;
