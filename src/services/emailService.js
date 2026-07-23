const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendReportEmail = async ({ to, subject, html, pdfBuffer, filename }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Fountain HFC" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      attachments: [{ filename: filename || 'report.pdf', content: pdfBuffer }],
    });
    console.log(`✅ Email sent to ${to}`);
    return { success: true };
  } catch (error) {
    console.error('❌ Email error:', error);
    return { success: false, error: error.message };
  }
};