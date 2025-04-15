/**
 * Contact Controller
 * Handles contact form submissions and related operations
 */
const Contact = require("../models/Contact");

/**
 * Submit contact form
 * @route POST /api/v1/contact
 * @access Public
 */
exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create new contact submission
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully",
      data: {
        id: contact._id,
      },
    });

    // Here you could add email notification logic
    // sendEmailNotification(contact);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting contact form",
      error: error.message,
    });
  }
};

/**
 * Get all contact submissions
 * @route GET /api/v1/contact
 * @access Private (Admin)
 */
exports.getContacts = async (req, res) => {
  try {
    const { read, page = 1, limit = 10 } = req.query;

    // Build query
    let query = {};

    // Filter by read status if provided
    if (read === "true") {
      query.read = true;
    } else if (read === "false") {
      query.read = false;
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get contacts with pagination
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      count: contacts.length,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving contacts",
      error: error.message,
    });
  }
};

/**
 * Get single contact by ID
 * @route GET /api/v1/contact/:id
 * @access Private (Admin)
 */
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    // Mark as read if not already
    if (!contact.read) {
      contact.read = true;
      await contact.save();
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving contact",
      error: error.message,
    });
  }
};

/**
 * Mark contact as read/unread
 * @route PUT /api/v1/contact/:id/read
 * @access Private (Admin)
 */
exports.toggleReadStatus = async (req, res) => {
  try {
    const { read } = req.body;

    if (read === undefined) {
      return res.status(400).json({
        success: false,
        message: "Read status is required",
      });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    // Update read status
    contact.read = read;
    await contact.save();

    res.status(200).json({
      success: true,
      message: `Contact marked as ${read ? "read" : "unread"}`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating contact",
      error: error.message,
    });
  }
};

/**
 * Delete contact
 * @route DELETE /api/v1/contact/:id
 * @access Private (Admin)
 */
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting contact",
      error: error.message,
    });
  }
};
