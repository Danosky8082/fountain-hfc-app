const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Force IPv4 (fixes ENETUNREACH)
  family: 4,
  // Increase timeouts to avoid connection drops
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

/**
 * Send an email with a PDF attachment
 */
exports.sendReportEmail = async ({ to, subject, html, pdfBuffer, filename }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Fountain HFC" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      attachments: [{ filename: filename || 'report.pdf', content: pdfBuffer }],
    });
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email error:', error);
    return { success: false, error: error.message };
  }
};