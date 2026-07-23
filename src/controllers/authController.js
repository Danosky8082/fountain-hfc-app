const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// ─── Helper: Generate 6-digit OTP ─────────────────────────────
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// ─── Existing password login (for HOD/ADMIN) ──────────────────
exports.login = async (req, res) => {
  try {
    const { churchId, password } = req.body;

    if (!churchId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Church ID and password are required.',
      });
    }

    const user = await prisma.user.findUnique({
      where: { churchId: churchId.trim() },
      include: {
        leading: true,
        assisting: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Church ID or password.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Church ID or password.',
      });
    }

    // ✅ Allow ADMIN and HOD to login without a fellowship
    const fellowship = user.leading || user.assisting;
    if (!fellowship && user.role !== 'ADMIN' && user.role !== 'HOD') {
      return res.status(403).json({
        success: false,
        message: 'This user is not assigned to any fellowship. Contact admin.',
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        fellowshipId: fellowship?.id || null,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { passwordHash, ...userWithoutPassword } = user;
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        fellowship: fellowship
          ? {
              id: fellowship.id,
              name: fellowship.name,
              location: fellowship.location,
            }
          : null,
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: {
        leading: true,
        assisting: true,
      },
    });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const { passwordHash, ...userWithoutPassword } = user;
    res.status(200).json({ success: true, data: userWithoutPassword });
  } catch (error) {
    console.error('GetMe error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Request OTP ────────────────────────────────────────────────
exports.requestOTP = async (req, res) => {
  try {
    const { churchId } = req.body;
    if (!churchId) {
      return res.status(400).json({ success: false, message: 'Church ID is required.' });
    }

    const user = await prisma.user.findUnique({
      where: { churchId: churchId.trim() },
      include: { leading: true, assisting: true },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Only FL and ASSOCIATE can use OTP login
    if (user.role !== 'FL' && user.role !== 'ASSOCIATE') {
      return res.status(403).json({
        success: false,
        message: 'Please use password login for this account.',
      });
    }

    // ─── Temporary debug: return OTP directly ──────────────────
// Remove this block after email is working
console.log('🔑 DEBUG OTP for', user.churchId, ':', otp);
return res.status(200).json({
  success: true,
  message: 'OTP generated (debug mode)',
  data: { userId: user.id, otp: otp },
});

    // Check if user has an email
    if (!user.email) {
      return res.status(400).json({
        success: false,
        message: 'No email registered for this user. Contact admin.',
      });
    }

    // Generate and hash OTP
    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Delete any existing unused OTPs for this user
    await prisma.oTP.deleteMany({
      where: {
        userId: user.id,
        used: false,
      },
    });

    // Save new OTP (expires in 5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await prisma.oTP.create({
      data: {
        userId: user.id,
        otp: hashedOtp,
        expiresAt,
      },
    });

    // Send email using existing email service
    const { sendReportEmail } = require('../services/emailService');
    const result = await sendReportEmail({
      to: user.email,
      subject: '🔐 Your OTP for Fountain HFC Login',
      html: `
        <h2>Your One-Time Password</h2>
        <p>Hello ${user.fullName},</p>
        <p>Your OTP for login is:</p>
        <h1 style="font-size: 36px; letter-spacing: 4px;">${otp}</h1>
        <p>This code is valid for <strong>5 minutes</strong>.</p>
        <p>If you did not request this, please ignore this email.</p>
        <hr />
        <p><em>Fountain of Life HFC System</em></p>
      `,
      pdfBuffer: null,
      filename: null,
    });

    if (!result.success) {
      console.error('Failed to send OTP email:', result.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP. Please try again later.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'OTP sent to your email.',
      data: { userId: user.id, role: user.role },
    });
  } catch (error) {
    console.error('Request OTP error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// ─── Verify OTP ──────────────────────────────────────────────────
exports.verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      return res.status(400).json({ success: false, message: 'User ID and OTP are required.' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { leading: true, assisting: true },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Find the latest unused OTP for this user
    const otpRecord = await prisma.oTP.findFirst({
      where: {
        userId: user.id,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired OTP. Please request a new one.',
      });
    }

    // Verify OTP
    const isValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid OTP.' });
    }

    // Mark OTP as used
    await prisma.oTP.update({
      where: { id: otpRecord.id },
      data: { used: true },
    });

    // Issue JWT token
    const fellowship = user.leading || user.assisting;
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        fellowshipId: fellowship?.id || null,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { passwordHash, ...userWithoutPassword } = user;
    res.status(200).json({
      success: true,
      message: 'Login successful.',
      data: {
        user: userWithoutPassword,
        fellowship: fellowship
          ? {
              id: fellowship.id,
              name: fellowship.name,
              location: fellowship.location,
            }
          : null,
        token,
      },
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};