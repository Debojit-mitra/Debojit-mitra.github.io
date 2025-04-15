/**
 * Contact Routes
 * Handles contact form submissions and management
 */
const {
  submitContact,
  getContacts,
  getContact,
  toggleReadStatus,
  deleteContact,
} = require("../controllers/contactController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validationMiddleware");

module.exports = (router) => {
  // Public routes
  router.post("/api/v1/contact/submit", validate.createContact, submitContact);

  // Protected routes - Admin only
  router.get(
    "/api/v1/contact/getall",
    protect,
    authorize("admin"),
    getContacts
  );
  router.put(
    "/api/v1/contact/:id/read",
    protect,
    authorize("admin"),
    validate.idParam,
    toggleReadStatus
  );
  router.delete(
    "/api/v1/contact/:id/delete",
    protect,
    authorize("admin"),
    validate.idParam,
    deleteContact
  );
  router.get(
    "/api/v1/contact/:id",
    protect,
    authorize("admin"),
    validate.getContact,
    getContact
  );
};
