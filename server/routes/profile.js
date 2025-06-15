// File: routes/profile.js
const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const auth = require("../middleware/auth"); // use your existing auth.js middleware

// GET /api/profile
router.get("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// POST /api/profile
router.post("/", auth, async (req, res) => {
  try {
    const profileData = { ...req.body, user: req.user.id };
    const existingProfile = await Profile.findOne({ user: req.user.id });
    if (existingProfile)
      return res.status(400).json({ message: "Profile already exists" });

    const profile = new Profile(profileData);
    await profile.save();
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT /api/profile
router.put("/", auth, async (req, res) => {
  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedProfile)
      return res.status(404).json({ message: "Profile not found" });
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE /api/profile
router.delete("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
