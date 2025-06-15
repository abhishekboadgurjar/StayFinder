const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");
const auth = require("../middleware/auth");

// ✅ Get all listings with optional filters (location, minPrice, maxPrice)
router.get("/", async (req, res) => {
  try {
    const { location, minPrice, maxPrice } = req.query;
    const filter = {};

    if (location) filter.location = { $regex: location, $options: "i" };
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = +minPrice;
    if (maxPrice) filter.price.$lte = +maxPrice;

    const listings = await Listing.find(filter);
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching listings" });
  }
});

// ✅ Get a single listing by ID
router.get("/:id", async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Error fetching listing" });
  }
});

// ✅ Create a listing (Host only)
router.post("/", auth, async (req, res) => {
  try {
    if (!req.user.isHost) {
      return res.status(403).json({ message: "Only hosts can add listings" });
    }

    const listing = new Listing({ ...req.body, hostId: req.user.id });
    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ message: "Error creating listing" });
  }
});

// ✅ Update a listing (Host only)
router.put("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (listing.hostId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating listing" });
  }
});

// ✅ Delete a listing (Host only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (listing.hostId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await listing.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting listing" });
  }
});

// Get listings by logged-in host
router.get("/my-listings", auth, async (req, res) => {
  try {
    if (!req.user.isHost) {
      return res
        .status(403)
        .json({ message: "Only hosts can view their listings" });
    }

    const listings = await Listing.find({ hostId: req.user.id });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching host listings" });
  }
});

module.exports = router;
