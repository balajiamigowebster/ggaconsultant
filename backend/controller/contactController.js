const Contact = require('../models/Contact');
const { sendEnquiryEmail } = require('../config/mailer');

// POST /api/contact
exports.createContactEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required fields.' });
    }

    // Save enquiry into MySQL database
    const newEnquiry = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : null,
      message: message.trim(),
    });

    // Optionally send email notification if nodemailer credentials configured
    try {
      await sendEnquiryEmail({ name, email, phone, message });
    } catch (mailError) {
      console.warn('! Mail send failed (enquiry was still saved to database):', mailError.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received and saved.',
      data: newEnquiry,
    });
  } catch (error) {
    console.error('Error creating contact enquiry:', error);
    return res.status(500).json({
      error: 'An error occurred while submitting your enquiry. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// GET /api/contact (optional, to view stored enquiries)
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Contact.findAll({
      order: [['createdAt', 'DESC']],
    });
    return res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return res.status(500).json({ error: 'Failed to retrieve enquiries' });
  }
};
