const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

// Submit enquiry form
router.post('/', contactController.createContactEnquiry);

// Get list of enquiries
router.get('/', contactController.getAllEnquiries);

module.exports = router;
