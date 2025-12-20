const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const upload = require("../config/cloudinary");

// ✅ POST: Create Client with Image Upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, designation } = req.body;
    const imageUrl = req.file ? req.file.path : "";

    const client = await Client.create({
      name,
      description,
      designation,
      image: imageUrl 
    });

    res.status(201).json({ success: true, client });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ GET: Fetch all clients (Sorted: Newest First)
router.get("/", async (req, res) => {
  try {
    // .sort({ createdAt: -1 }) ensures the most recent entries appear first
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;