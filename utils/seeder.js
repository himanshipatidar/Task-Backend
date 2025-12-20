const Project = require("../models/Project");
// In CommonJS, you just require the JSON file directly
const projectsData = require("../data/projects.json");

const seedProjects = async () => {
  try {
    // 1. Check if data already exists
    const count = await Project.countDocuments();

    if (count === 0) {
      console.log("Empty database found. Seeding sample projects...");
      
      // 2. Insert the JSON data
      await Project.insertMany(projectsData);
      
      console.log("✅ Database Seeded Successfully!");
    } else {
      console.log("ℹ️ Database already has data. Skipping seeding.");
    }
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
  }
};

module.exports = seedProjects;