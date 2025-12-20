require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const seedProjects = require("./utils/seeder");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/subscribe", require("./routes/subscriberRoutes"));
app.use("/api/admin", require("./routes/adminRoutes")); // ✅ ADD THIS

const startServer = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB...");

    await seedProjects();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
