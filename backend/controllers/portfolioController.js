/**
 * Portfolio Controller
 * Handles operations for general portfolio data
 */
const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Timeline = require("../models/Timeline");
const User = require("../models/User");

/**
 * Get portfolio homepage data
 * @route GET /api/v1/portfolio/getdata
 * @access Public
 */
exports.getPortfolioData = async (req, res) => {
  try {
    // Get projects
    const projects = await Project.find().sort({ createdAt: -1 });

    // Get skills
    const skills = await Skill.find().sort({ createdAt: -1 });

    // Get timeline events
    const timelineEvents = await Timeline.find().sort({ year: -1 });

    // Get owner data (admin user)
    const ownerData = await User.findOne({ role: "admin" }).select(
      "-password -role -_id -lastLogin -updatedAt -__v"
    );

    // Bundle the data
    const portfolioData = {
      projects,
      skills,
      timelineEvents,
      ownerData,
    };

    res.status(200).json({
      success: true,
      data: portfolioData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving portfolio data",
      error: error.message,
    });
  }
};

/**
 * Update owner profile data
 * @route PUT /api/v1/portfolio/owner
 * @access Private (Admin only)
 */
exports.updateOwnerData = async (req, res) => {
  try {
    // Only update non-auth fields
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      footerDescription: req.body.footerDescription,
      title: req.body.title,
      location: req.body.location,
      locationLink: req.body.locationLink,
      instagram: req.body.instagram,
      linkedin: req.body.linkedin,
      github: req.body.github,
      about: req.body.about,
    };

    // Find admin user and update
    const owner = await User.findOneAndUpdate({ role: "admin" }, updateData, {
      new: true,
      runValidators: true,
    }).select("-password -role");

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Admin user not found",
      });
    }

    res.status(200).json({
      success: true,
      data: owner,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating owner data",
      error: error.message,
    });
  }
};

/**
 * Get timeline events
 * @route GET /api/v1/portfolio/timeline
 * @access Public
 */
exports.getTimelineEvents = async (req, res) => {
  try {
    const timelineEvents = await Timeline.find().sort({ year: -1 });

    res.status(200).json({
      success: true,
      count: timelineEvents.length,
      data: timelineEvents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving timeline events",
      error: error.message,
    });
  }
};

/**
 * Create timeline event
 * @route POST /api/v1/portfolio/timeline
 * @access Private
 */
exports.createTimelineEvent = async (req, res) => {
  try {
    const timelineEvent = await Timeline.create(req.body);

    res.status(201).json({
      success: true,
      data: timelineEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating timeline event",
      error: error.message,
    });
  }
};

/**
 * Update timeline event
 * @route PUT /api/v1/portfolio/timeline/:id
 * @access Private
 */
exports.updateTimelineEvent = async (req, res) => {
  try {
    let timelineEvent = await Timeline.findById(req.params.id);

    if (!timelineEvent) {
      return res.status(404).json({
        success: false,
        message: "Timeline event not found",
      });
    }

    timelineEvent = await Timeline.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: timelineEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating timeline event",
      error: error.message,
    });
  }
};

/**
 * Delete timeline event
 * @route DELETE /api/v1/portfolio/timeline/:id
 * @access Private
 */
exports.deleteTimelineEvent = async (req, res) => {
  try {
    const timelineEvent = await Timeline.findById(req.params.id);

    if (!timelineEvent) {
      return res.status(404).json({
        success: false,
        message: "Timeline event not found",
      });
    }

    await timelineEvent.deleteOne();

    res.status(200).json({
      success: true,
      message: "Timeline deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting timeline event",
      error: error.message,
    });
  }
};
