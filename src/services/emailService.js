const nodemailer = require('nodemailer');
const dns = require('dns');
const { promisify } = require('util');

const resolve4 = promisify(dns.resolve4);

// Get IPv4 address for smtp.gmail.com
let smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
let smtpHostIp = 'smtp.gmail.com'; // fallback

// Resolve IPv4
resolve4(smtpHost)
  .then((addresses) => {
    if (addresses.length > 0) {
      smtpHostIp = addresses[0];
      console.log(`✅ Resolved ${smtpHost} to IPv4: ${smtpHostIp}`);
    }
  })
  .catch((err) => console.warn('⚠️ Could not resolve IPv4, using hostname:', err));

const transporter = nodemailer.createTransport({
  host: smtpHostIp, // Use the resolved IPv4 address
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  family: 4, // still force IPv4
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000,
});

exports.sendReportEmail = async ({ to, subject, html, pdfBuffer, filename }) => {
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