const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,               // SSL – more reliable
  secure: true,            // true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  family: 4,               // Force IPv4
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 15000,
  tls: {
    rejectUnauthorized: false,
  },
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