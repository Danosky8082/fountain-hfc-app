const sgMail = require('@sendgrid/mail');

// Use SendGrid API key from environment
const apiKey = process.env.SENDGRID_API_KEY;
const fromEmail = process.env.SENDGRID_FROM_EMAIL || process.env.SMTP_USER;

let sendEmailFunction;

if (apiKey) {
  sgMail.setApiKey(apiKey);
  sendEmailFunction = async ({ to, subject, html, pdfBuffer, filename }) => {
    try {
      const attachments = [];
      if (pdfBuffer) {
        attachments.push({
          content: pdfBuffer.toString('base64'),
          filename: filename || 'report.pdf',
          type: 'application/pdf',
          disposition: 'attachment',
        });
      }
      const msg = {
        to,
        from: fromEmail,
        subject,
        html,
        attachments,
      };
      await sgMail.send(msg);
      console.log(`✅ Email sent to ${to} via SendGrid`);
      return { success: true };
    } catch (error) {
      console.error('❌ SendGrid error:', error.response?.body || error.message);
      return { success: false, error: error.message };
    }
  };
} else {
  // Fallback to Nodemailer (if SendGrid key not set)
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    family: 4,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
  });
  sendEmailFunction = async ({ to, subject, html, pdfBuffer, filename }) => {
    try {
      const attachments = [];
      if (pdfBuffer) {
        attachments.push({ filename: filename || 'report.pdf', content: pdfBuffer });
      }
      const info = await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Fountain HFC" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
        attachments,
      });
      console.log(`✅ Email sent to ${to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('❌ Email error:', error);
      return { success: false, error: error.message };
    }
  };
}

// Export the function
exports.sendReportEmail = sendEmailFunction;