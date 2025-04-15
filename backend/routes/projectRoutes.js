/**
 * Project Routes
 * Handles CRUD operations for projects
 */
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getCategories,
} = require("../controllers/projectController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validationMiddleware");

module.exports = (router) => {
  // Public routes
  router.get("/api/v1/project/getall", getProjects);
  router.get("/api/v1/project/categories/getall", getCategories);
  router.get("/api/v1/project/:id", validate.getProject, getProject);

  // Protected routes - Admin only
  router.post(
    "/api/v1/project/create",
    protect,
    authorize("admin"),
    validate.createProject,
    createProject
  );
  router.put(
    "/api/v1/project/:id/update",
    protect,
    authorize("admin"),
    validate.updateProject,
    updateProject
  );
  router.delete(
    "/api/v1/project/:id/delete",
    protect,
    authorize("admin"),
    validate.deleteProject,
    deleteProject
  );
};
