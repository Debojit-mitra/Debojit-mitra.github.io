/**
 * Default configuration settings for the application
 */
module.exports = {
  // JWT configuration
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
  jwtExpiration: "1d",

  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  // CORS configuration
  corsOrigin: process.env.CORS_ORIGIN || "*", // Use CORS_ORIGIN from .env, fallback to "*"
};
