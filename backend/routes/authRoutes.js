/**
 * Authentication Routes
 * Handles user login and token verification
 */
const { login, getMe, logout } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validationMiddleware");

module.exports = (router) => {
  // Public routes
  router.post("/api/v1/auth/login", validate.login, login);

  // Protected routes
  router.get("/api/v1/auth/me", protect, getMe);
  router.post("/api/v1/auth/logout", protect, logout);
};
