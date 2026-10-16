const nodemailer = require('nodemailer');
require('dotenv').config();

let transporter = null;

if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

async function sendEnquiryEmail({ name, email, phone, message }) {
  if (!transporter) {
    console.log('ℹ Email credentials not provided in .env; skipping email dispatch.');
    return;
  }

  const mailOptions = {
    from: `"GGA Website Enquiry" <${process.env.EMAIL_USER || 'supportgga@amigoweb.in'}>`,
    to: process.env.NOTIFICATION_TO || 'supportgga@amigoweb.in',
    cc: process.env.NOTIFICATION_CC || 'ggamepconsultant@gmail.com',
    replyTo: email,
    subject: `New Project Enquiry from ${name}`,
    html: `
      <h2>New Contact Enquiry Received</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background:#f4f4f4;padding:12px;border-left:4px solid #ffdf24;">
        ${message.replace(/\n/g, '<br/>')}
      </blockquote>
      <p><small>Sent from GGA MEP website</small></p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendEnquiryEmail };
