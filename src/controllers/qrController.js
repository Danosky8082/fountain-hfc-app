const QRCode = require('qrcode');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

exports.generateMemberQR = async (req, res) => {
  try {
    const { memberId } = req.params;

    // 1. Get token from query string OR Authorization header
    const token = req.query.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: no token provided' });
    }

    // 2. Verify the token (optional but recommended)
    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

    // 3. Fetch member data
    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: { fellowship: true },
    });

    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    // 4. Generate QR code buffer (high error correction for logo overlay)
    const qrBuffer = await QRCode.toBuffer(member.id, {
      errorCorrectionLevel: 'H',
      width: 400,
      margin: 2,
    });

    // 5. Load logo and overlay it in the centre
    const logoPath = path.join(__dirname, '../../assets/logo.png');
    // Check if logo exists; if not, skip overlay
    let finalBuffer;
    if (fs.existsSync(logoPath)) {
      const logo = await sharp(logoPath).resize(80, 80, { fit: 'cover' }).toBuffer();
      finalBuffer = await sharp(qrBuffer)
        .composite([{ input: logo, gravity: 'centre' }])
        .png()
        .toBuffer();
    } else {
      // fallback: QR without logo
      console.warn('Logo not found at', logoPath);
      finalBuffer = qrBuffer;
    }

    // 6. Send the image
    res.setHeader('Content-Type', 'image/png');
    res.send(finalBuffer);
  } catch (error) {
    console.error('QR generation error:', error);
    res.status(500).json({ success: false, message: 'QR generation failed' });
  }
};