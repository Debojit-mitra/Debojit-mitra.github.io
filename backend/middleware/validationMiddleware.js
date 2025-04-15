/**
 * Validation middleware
 * Validates incoming requests using express-validator
 */
const { validationResult } = require("express-validator");
const {
  projectValidationRules,
  skillValidationRules,
  contactValidationRules,
  registerValidationRules,
  loginValidationRules,
  idParamRule,
} = require("../utils/validators");

/**
 * Middleware to validate request data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
const validateRequest = (req, res, next) => {
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

// Validation schemas combined with validation middleware
const validate = {
  // Auth validation
  register: [registerValidationRules, validateRequest],
  login: [loginValidationRules, validateRequest],

  // Project validation
  createProject: [projectValidationRules, validateRequest],
  updateProject: [idParamRule, projectValidationRules, validateRequest],
  deleteProject: [idParamRule, validateRequest],
  getProject: [idParamRule, validateRequest],

  // Skill validation
  createSkill: [skillValidationRules, validateRequest],
  updateSkill: [idParamRule, skillValidationRules, validateRequest],
  deleteSkill: [idParamRule, validateRequest],
  getSkill: [idParamRule, validateRequest],

  // Contact validation
  createContact: [contactValidationRules, validateRequest],
  getContact: [idParamRule, validateRequest],

  // General ID validation
  idParam: [idParamRule, validateRequest],
};

module.exports = {
  validate,
};
