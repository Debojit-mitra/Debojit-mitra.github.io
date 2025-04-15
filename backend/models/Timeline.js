/**
 * Timeline Model
 * Defines the schema for timeline events in the portfolio
 */
const mongoose = require("mongoose");

const TimelineSchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: [true, "Please add a year"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Please add a timeline event title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"],
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

module.exports = mongoose.model("Timeline", TimelineSchema);
