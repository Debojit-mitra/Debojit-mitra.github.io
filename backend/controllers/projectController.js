/**
 * Project Controller
 * Handles CRUD operations for portfolio projects
 */
const Project = require("../models/Project");

/**
 * Get all projects
 * @route GET /api/v1/projects
 * @access Public
 */
exports.getProjects = async (req, res) => {
  try {
    const { category, limit, featured, search } = req.query;

    // Build query
    let query = {};

    // Filter by category if provided
    if (category && category !== "all") {
      query.categories = category;
    }

    // Filter by featured status if provided
    if (featured === "true") {
      query.featured = true;
    }

    // Search in title and description if search term provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    // Execute query with sorting and optional limit
    let projectsQuery = Project.find(query).sort({ createdAt: -1 });

    // Apply limit if provided
    if (limit) {
      projectsQuery = projectsQuery.limit(parseInt(limit));
    }

    const projects = await projectsQuery;

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving projects",
      error: error.message,
    });
  }
};

/**
 * Get single project by ID
 * @route GET /api/v1/projects/:id
 * @access Public
 */
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving project",
      error: error.message,
    });
  }
};

/**
 * Create new project
 * @route POST /api/v1/projects
 * @access Private (Admin)
 */
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating project",
      error: error.message,
    });
  }
};

/**
 * Update project
 * @route PUT /api/v1/projects/:id
 * @access Private (Admin)
 */
exports.updateProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Update project
    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating project",
      error: error.message,
    });
  }
};

/**
 * Delete project
 * @route DELETE /api/v1/projects/:id
 * @access Private (Admin)
 */
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting project",
      error: error.message,
    });
  }
};

/**
 * Get project categories
 * @route GET /api/v1/projects/categories
 * @access Public
 */
exports.getCategories = async (req, res) => {
  try {
    // Get all distinct categories from projects
    const categories = await Project.distinct("categories");

    // Ensure 'all' is included and at the beginning
    const sortedCategories = [
      "all",
      ...categories.filter((cat) => cat !== "all"),
    ];

    res.status(200).json({
      success: true,
      data: sortedCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving categories",
      error: error.message,
    });
  }
};
