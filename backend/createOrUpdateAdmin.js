/**
 * Script to create an admin user with portfolio owner data
 * Run this script to create the initial admin account
 *
 * Usage: node scripts/createAdmin.js
 */
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Import DB config
const connectDB = require("./config/db");

// Connect to database
connectDB();

// Admin user model - full version to match User model with owner fields
const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  description: String,
  title: String,
  location: String,
  instagram: String,
  linkedin: String,
  about: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

// Create temporary model
const Admin = mongoose.model("User", adminSchema);

// Admin user details - sourced from environment variables when available
const adminData = {
  // Auth data
  name: process.env.OWNER_NAME || "Dummy Name",
  email: process.env.OWNER_EMAIL || "dummmy101email@gmail.com",
  password: process.env.ADMIN_PASSWORD || "admin123", // Get from .env or use default
  role: "admin",

  // Portfolio owner data
  description: process.env.OWNER_DESCRIPTION || "Its an description",
  title: process.env.OWNER_TITLE || "Full Stack & Android Dummy Developer",
  location: process.env.OWNER_LOCATION || "Somewhere in World, Earth",
  instagram: process.env.OWNER_INSTAGRAM || "https://www.instagram.com/",
  linkedin: process.env.OWNER_LINKEDIN || "https://in.linkedin.com/",
  about:
    process.env.OWNER_ABOUT ||
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
};

// Create admin user
const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: adminData.email });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log("Would you like to update the owner information? (y/n)");

      // Simple way to get user input
      process.stdin.once("data", async (data) => {
        if (data.toString().trim().toLowerCase() === "y") {
          // Update owner information
          const updatedAdmin = await Admin.findOneAndUpdate(
            { email: adminData.email },
            {
              name: adminData.name,
              description: adminData.description,
              title: adminData.title,
              location: adminData.location,
              instagram: adminData.instagram,
              linkedin: adminData.linkedin,
              about: adminData.about,
            },
            { new: true }
          );

          console.log("Owner information updated successfully!");
          process.exit(0);
        } else {
          console.log("Operation canceled. Admin user remains unchanged.");
          process.exit(0);
        }
      });
      return; // Wait for user input
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    // Create admin with hashed password and owner data
    const admin = await Admin.create({
      name: adminData.name,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role,
      description: adminData.description,
      title: adminData.title,
      location: adminData.location,
      instagram: adminData.instagram,
      linkedin: adminData.linkedin,
      about: adminData.about,
    });

    console.log("Admin user created successfully!");
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${adminData.password}`);
    console.log(
      "\nPlease save these credentials securely and change the password after first login."
    );
    console.log("\nOwner information has also been set up for the portfolio.");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

// Run the function
createAdmin();
