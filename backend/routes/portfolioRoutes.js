/**
 * Portfolio Routes
 * Handles general portfolio data and social links
 */
const {
  getPortfolioData,
  updateOwnerData,
  getTimelineEvents,
  createTimelineEvent,
  updateTimelineEvent,
  deleteTimelineEvent,
} = require("../controllers/portfolioController");
const { protect, authorize } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validationMiddleware");

module.exports = (router) => {
  // Public routes
  router.get("/api/v1/portfolio/getdata", getPortfolioData);
  router.get("/api/v1/portfolio/timeline", getTimelineEvents);

  // Protected routes (admin only)
  router.put(
    "/api/v1/portfolio/owner/update",
    protect,
    authorize("admin"),
    updateOwnerData
  );
  router.post(
    "/api/v1/portfolio/timeline/create",
    protect,
    authorize("admin"),
    createTimelineEvent
  );
  router.put(
    "/api/v1/portfolio/timeline/:id/update",
    protect,
    authorize("admin"),
    updateTimelineEvent
  );
  router.delete(
    "/api/v1/portfolio/timeline/:id/delete",
    protect,
    authorize("admin"),
    deleteTimelineEvent
  );
};
