const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const upload = require("../config/cloudinary"); // Import the configuration we created

// Create Project with Image Upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // req.file.path contains the secure URL provided by Cloudinary
    const imageUrl = req.file ? req.file.path : "";

    const project = await Project.create({
      title,
      description,
      image: imageUrl // Storing the Cloudinary link in DB
    });

    res.status(201).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get All Projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;