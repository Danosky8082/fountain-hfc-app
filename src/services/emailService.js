const { Resend } = require('resend');

const apiKey = process.env.RESEND_API_KEY;
// Fallback to Resend's default sender if not set
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

let resend;

if (apiKey) {
  resend = new Resend(apiKey);
} else {
  console.warn('⚠️ No Resend API key – emails will not be sent.');
}

exports.sendReportEmail = async ({ to, subject, html, pdfBuffer, filename }) => {
  if (!apiKey || !resend) {
    console.warn('⚠️ No Resend API key – email not sent.');
    return { success: false, error: 'No API key' };
  }

  try {
    const attachments = [];
    if (pdfBuffer) {
      attachments.push({
        filename: filename || 'report.pdf',
        content: pdfBuffer.toString('base64'),
      });
    }

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject,
      html,
      attachments,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return { success: false, error: error.message };
    }

    console.log(`✅ Email sent to ${to} via Resend: ${data?.id}`);
    return { success: true, id: data?.id };
  } catch (error) {
    console.error('❌ Resend error:', error);
    return { success: false, error: error.message };
  }
};