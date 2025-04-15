/**
 * Project Model
 * Defines the schema for portfolio projects
 */
const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a project title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    image: {
      type: String,
      default: "https://i.ibb.co/kcDG09n/splash-wallpaper.webp",
    },
    tags: {
      type: [String],
      required: [true, "Please add at least one tag"],
    },
    categories: {
      type: [String],
      required: [true, "Please add at least one category"],
      enum: {
        values: ["mobile", "web", "ai_ml", "cli", "all"],
        message: "{VALUE} is not supported as a category",
      },
    },
    github: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    demo: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create an index for efficient querying by category
ProjectSchema.index({ categories: 1 });

module.exports = mongoose.model("Project", ProjectSchema);
