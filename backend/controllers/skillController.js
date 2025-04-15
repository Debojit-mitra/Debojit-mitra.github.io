/**
 * Skill Controller
 * Handles CRUD operations for skills
 */
const Skill = require("../models/Skill");

/**
 * Get all skills
 * @route GET /api/v1/skills
 * @access Public
 */
exports.getSkills = async (req, res) => {
  try {
    // Get skills sorted
    const skills = await Skill.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving skills",
      error: error.message,
    });
  }
};

/**
 * Get single skill by ID
 * @route GET /api/v1/skills/:id
 * @access Public
 */
exports.getSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.status(200).json({
      success: true,
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving skill",
      error: error.message,
    });
  }
};

/**
 * Create new skill
 * @route POST /api/v1/skills
 * @access Private (Admin)
 */
exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating skill",
      error: error.message,
    });
  }
};

/**
 * Update skill
 * @route PUT /api/v1/skills/:id
 * @access Private (Admin)
 */
exports.updateSkill = async (req, res) => {
  try {
    let skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    // Update skill
    skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating skill",
      error: error.message,
    });
  }
};

/**
 * Delete skill
 * @route DELETE /api/v1/skills/:id
 * @access Private (Admin)
 */
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    await skill.deleteOne();

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting skill",
      error: error.message,
    });
  }
};
