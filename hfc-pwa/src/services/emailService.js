const nodemailer = require('nodemailer');

// Create transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // optional for self-signed certs
  },
});

/**
 * Send an email with a PDF attachment
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} html - email body (HTML)
 * @param {Buffer} pdfBuffer - PDF file buffer
 * @param {string} filename - PDF filename
 */
exports.sendReportEmail = async ({
  to,
  subject,
  html,
  pdfBuffer,
  filename,
}) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Fountain HFC" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      attachments: [
        {
          filename: filename || 'monthly_report.pdf',
          content: pdfBuffer,
        },
      ],
    });
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email error:', error);
    return { success: false, error: error.message };
  }
};