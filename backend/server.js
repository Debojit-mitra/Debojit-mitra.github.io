/**
 * Main server file
 * Entry point for the portfolio backend application
 */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

// Import config
const config = require("./config/config");

// Database connection
const connectDB = require("./config/db");

// Import error handler
const errorHandler = require("./utils/errorHandler");

// Create Express app
const app = express();

// Connect to Database
connectDB();

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) {
      return callback(null, true);
    }

    const allowedOrigins = config.corsOrigin
      .split(",")
      .map((origin) => origin.trim());
    if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(config.nodeEnv === "development" ? "dev" : "combined"));

// Health check route
app.get(`/api/v1/health`, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running",
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// ===== IMPORT MODELS ====
require("./models/User");
require("./models/Contact");
require("./models/Project");
require("./models/Skill");
require("./models/Timeline");

// ==== IMPORT ROUTES ====
require("./routes/authRoutes")(app);
require("./routes/portfolioRoutes")(app);
require("./routes/projectRoutes")(app);
require("./routes/skillRoutes")(app);
require("./routes/contactRoutes")(app);

// 404 handler for API routes
app.use(`/api/v1/*`, (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Error handler middleware
app.use(errorHandler);

// Start server
const PORT = config.port;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully");
  server.close(() => {
    console.log("Process terminated");
    process.exit(0);
  });
});

module.exports = app;
