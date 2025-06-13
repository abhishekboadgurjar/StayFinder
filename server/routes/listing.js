const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");
const auth = require("../middleware/auth");

// Get all listings
// /routes/listings.js
router.get("/", async (req, res) => {
  const { location, minPrice, maxPrice } = req.query;
  const filter = {};

  if (location) filter.location = { $regex: location, $options: "i" };
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = +minPrice;
  if (maxPrice) filter.price.$lte = +maxPrice;

  const listings = await Listing.find(filter);
  res.json(listings);
});

// Get single listing
router.get("/:id", async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  res.json(listing);
});

// Create listing (host only)
router.post("/", auth, async (req, res) => {
  if (!req.user.isHost)
    return res.status(403).json({ message: "Only hosts can add listings" });
  const listing = new Listing({ ...req.body, hostId: req.user.id });
  await listing.save();
  res.status(201).json(listing);
});

// Update listing
router.put("/:id", auth, async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (listing.hostId.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// Delete listing
router.delete("/:id", auth, async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (listing.hostId.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  await listing.remove();
  res.json({ message: "Deleted" });
});

module.exports = router;
