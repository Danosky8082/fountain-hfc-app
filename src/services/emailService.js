// src/services/emailService.js
exports.sendReportEmail = async ({ to, subject, html, pdfBuffer, filename }) => {
  if (!process.env.BREVO_API_KEY) {
    console.warn('⚠️ No Brevo API key – email not sent.');
    return { success: false, error: 'BREVO_API_KEY not configured' };
  }

  try {
    const payload = {
      sender: { name: "Fountain HFC", email: "dcmitch2000ng@gmail.com" },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    };

    if (pdfBuffer && Buffer.isBuffer(pdfBuffer)) {
      payload.attachment = [{
        name: filename || 'attachment.pdf',
        content: pdfBuffer.toString('base64'),
      }];
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('❌ Brevo API error:', error);
      return { success: false, error: error.message || 'Brevo API error' };
    }

    const data = await response.json();
    console.log(`✅ Email sent via Brevo API: ${data.messageId}`);
    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error('❌ Email send failed:', error.message);
    return { success: false, error: error.message };
  }
};