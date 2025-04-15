/**
 * Skill Model
 * Defines the schema for skills listed in the portfolio
 */
const mongoose = require("mongoose");

const ALLOWED_ICONS = [
  'Code',
  'Web',
  'Database',
  'Cloud',
  'AI',
  'Tools',
  'Language',
  'Education',
  'Logic',
  'Terminal',
  'Architecture',
  'Security',
  'Data',
  'Analytics',
  'Network',
  'Mobile',
  'Design'
];

const SkillSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a skill category title"],
      trim: true,
      maxlength: [50, "Title cannot be more than 50 characters"],
    },
    icon: {
      type: String,
      required: [true, "Please specify an icon name"],
      trim: true,
      enum: {
        values: ALLOWED_ICONS,
        message: "{VALUE} is not a valid icon. Please choose from the predefined list."
      }
    },
    skills: {
      type: [String],
      required: [true, "Please add at least one skill"],
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

module.exports = mongoose.model("Skill", SkillSchema);
