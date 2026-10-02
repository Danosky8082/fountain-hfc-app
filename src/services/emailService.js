// src/services/emailService.js
const nodemailer = require('nodemailer');

// ─── Validate required env vars on startup ──────────────────────
const REQUIRED_ENV = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.warn(
    `⚠️  Missing SMTP env vars: ${missing.join(', ')}. Emails will not be sent.`
  );
}

// ─── Create transporter ─────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true', // false for 587, true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Force IPv4 — avoids Node's IPv6-first resolution which
  // can hang on Render/Railway when the SMTP host only has A records.
  family: 4,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
  // Brevo sometimes has a slow initial handshake — pool helps reuse connections
  pool: true,
  maxConnections: 3,
  maxMessages: 100,
});

// ─── Verify transporter on first load (non-blocking) ────────────
if (missing.length === 0) {
  transporter.verify((err, success) => {
    if (err) {
      console.error('❌ SMTP transporter verification failed:', err.message);
    } else if (success) {
      console.log('✅ SMTP transporter is ready to send emails');
    }
  });
}

// ─── Default "from" address ─────────────────────────────────────
// Brevo requires the sender email to be verified in your account
// (either a verified domain or a single verified sender email).
const fromAddress =
  process.env.SMTP_FROM ||
  (process.env.SMTP_USER
    ? `"Fountain HFC" <${process.env.SMTP_USER}>`
    : 'no-reply@example.com');

// ─── Send email (main export) ───────────────────────────────────
/**
 * Send an email via Brevo SMTP.
 * Compatible with the existing call sites in authController.js and
 * any other controller that calls `sendReportEmail({ to, subject, html, pdfBuffer, filename })`.
 *
 * @param {Object}   opts
 * @param {string}   opts.to           - Recipient email (single) or comma-separated list
 * @param {string}   opts.subject      - Subject line
 * @param {string}   opts.html         - HTML body
 * @param {Buffer}  [opts.pdfBuffer]   - Optional PDF attachment
 * @param {string}  [opts.filename]    - Filename for the PDF attachment
 * @param {string}  [opts.text]        - Optional plain-text fallback
 * @param {string}  [opts.replyTo]     - Optional reply-to address
 * @returns {Promise<{success: boolean, messageId?: string, error?: string}>}
 */
exports.sendReportEmail = async ({
  to,
  subject,
  html,
  pdfBuffer = null,
  filename = null,
  text = null,
  replyTo = null,
}) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('⚠️  SMTP credentials missing — email not sent.');
    return { success: false, error: 'SMTP credentials not configured' };
  }

  if (!to || !subject || !html) {
    return { success: false, error: 'Missing required fields: to, subject, html' };
  }

  try {
    const attachments = [];
    if (pdfBuffer && Buffer.isBuffer(pdfBuffer)) {
      attachments.push({
        filename: filename || 'attachment.pdf',
        content: pdfBuffer,
        contentType: 'application/pdf',
      });
    }

    const mailOptions = {
      from: fromAddress,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]+>/g, ''), // crude HTML→text fallback
      attachments,
    };

    if (replyTo) {
      mailOptions.replyTo = replyTo;
    }

    const info = await transporter.sendMail(mailOptions);

    console.log(`✅ Email sent to ${to} — messageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Email send failed:', error.message);

    // Surface the most useful error hint for common Brevo failures
    let hint = error.message;
    if (error.responseCode === 535) {
      hint = 'Invalid SMTP credentials — check SMTP_USER and SMTP_PASS in Render env vars.';
    } else if (error.responseCode === 550) {
      hint = 'Sender email not verified in Brevo — verify your domain or sender address.';
    } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      hint = 'Could not reach Brevo SMTP — check SMTP_HOST and SMTP_PORT.';
    }

    return { success: false, error: hint };
  }
};

// ─── Optional helper for bulk sends (HOD report distribution) ────
/**
 * Send the same email to multiple recipients individually.
 * Useful if you later want to email all HODs their monthly reports.
 *
 * @param {string[]} recipients
 * @param {Object}   template  - same shape as sendReportEmail opts (minus `to`)
 * @returns {Promise<Array<{to: string, success: boolean, error?: string}>>}
 */
exports.sendBulkEmail = async (recipients, template) => {
  const results = [];
  for (const to of recipients) {
    const result = await exports.sendReportEmail({ ...template, to });
    results.push({ to, ...result });
    // Small delay to avoid Brevo rate-limit bursts
    await new Promise((r) => setTimeout(r, 200));
  }
  return results;
};