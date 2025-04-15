/**
 * Validation utilities for request validation
 */
const { body, param, validationResult } = require("express-validator");

/**
 * Project validation rules
 */
const projectValidationRules = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("Description must be between 10 and 500 characters"),

  body("image").optional().isURL().withMessage("Image must be a valid URL"),

  body("tags").isArray({ min: 1 }).withMessage("At least one tag is required"),

  body("tags.*")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Tags cannot be empty"),

  body("categories")
    .isArray({ min: 1 })
    .withMessage("At least one category is required"),

  body("categories.*")
    .trim()
    .isIn(["mobile", "web", "ai_ml", "cli", "all"])
    .withMessage("Invalid category value"),

  body("github").optional().isURL().withMessage("GitHub URL must be valid"),

  body("demo").optional().isURL().withMessage("Demo URL must be valid"),

  body("featured")
    .optional()
    .isBoolean()
    .withMessage("Featured must be a boolean"),

  body("order")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Order must be a positive integer"),
];

/**
 * Skill validation rules
 */
const skillValidationRules = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Title must be between 3 and 50 characters"),

  body("icon").trim().notEmpty().withMessage("Icon name is required"),

  body("skills")
    .isArray({ min: 1 })
    .withMessage("At least one skill is required"),

  body("skills.*")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Skills cannot be empty"),

  body("order")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Order must be a positive integer"),
];

/**
 * Contact validation rules
 */
const contactValidationRules = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("message")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Message must be between 10 and 1000 characters"),
];

/**
 * Auth validation rules
 */
const registerValidationRules = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const loginValidationRules = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address"),

  body("password").notEmpty().withMessage("Password is required"),
];

/**
 * ID parameter validation rule
 */
const idParamRule = [param("id").isMongoId().withMessage("Invalid ID format")];

/**
 * Validate request middleware
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  // Format validation errors
  const extractedErrors = {};
  errors.array().forEach((err) => {
    extractedErrors[err.path] = err.msg;
  });

  return res.status(400).json({
    success: false,
    message: "Validation failed",
    errors: extractedErrors,
  });
};

module.exports = {
  projectValidationRules,
  skillValidationRules,
  contactValidationRules,
  registerValidationRules,
  loginValidationRules,
  idParamRule,
  validate,
};
