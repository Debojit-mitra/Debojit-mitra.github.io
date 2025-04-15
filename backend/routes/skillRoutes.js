/**
 * Skill Routes
 * Handles CRUD operations for skills
 */
const {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
  reorderSkills,
} = require("../controllers/skillController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validationMiddleware");

module.exports = (router) => {
  // Public routes
  router.get("/api/v1/skill/getall", getSkills);
  router.get("/api/v1/skill/:id", validate.getSkill, getSkill);

  // Protected routes - Admin only
  router.post(
    "/api/v1/skill/create",
    protect,
    authorize("admin"),
    validate.createSkill,
    createSkill
  );
  router.put(
    "/api/v1/skill/:id/update",
    protect,
    authorize("admin"),
    validate.updateSkill,
    updateSkill
  );
  router.delete(
    "/api/v1/skill/:id/delete",
    protect,
    authorize("admin"),
    validate.deleteSkill,
    deleteSkill
  );
};
