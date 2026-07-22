const nodemailer = require('nodemailer');

// Configure your SMTP (e.g., Gmail, SendGrid)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send a monthly report via email
 * @param {string} to - recipient email
 * @param {object} reportData - report object
 * @param {Buffer} pdfBuffer - PDF file buffer
 */
exports.sendReportEmail = async (to, reportData, pdfBuffer) => {
  try {
    const info = await transporter.sendMail({
      from: `"Fountain HFC" <${process.env.SMTP_USER}>`,
      to,
      subject: `Monthly Report - ${reportData.monthYear}`,
      html: `
        <h2>Monthly Home Fellowship Report</h2>
        <p><strong>Fellowship:</strong> ${reportData.fellowship.name}</p>
        <p><strong>Month:</strong> ${reportData.monthYear}</p>
        <p><strong>Status:</strong> ${reportData.status}</p>
        <p>Please find the detailed PDF attached.</p>
      `,
      attachments: [
        {
          filename: `HFC_Report_${reportData.fellowship.name}_${reportData.monthYear}.pdf`,
          content: pdfBuffer,
        },
      ],
    });
    console.log('Email sent:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error: error.message };
  }
};