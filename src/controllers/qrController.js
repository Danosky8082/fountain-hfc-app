const QRCode = require('qrcode');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

exports.generateMemberQR = async (req, res) => {
  try {
    const { memberId } = req.params;
    const token = req.query.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: { fellowship: true },
    });

    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    // Generate QR code
    const qrBuffer = await QRCode.toBuffer(member.id, {
      errorCorrectionLevel: 'H',
      width: 400,
      margin: 2,
    });

    // Try to overlay logo
    const logoPath = path.join(__dirname, '../../assets/logo.png');
    let finalBuffer = qrBuffer;
    if (fs.existsSync(logoPath)) {
      try {
        const logo = await sharp(logoPath).resize(80, 80, { fit: 'cover' }).toBuffer();
        finalBuffer = await sharp(qrBuffer)
          .composite([{ input: logo, gravity: 'centre' }])
          .png()
          .toBuffer();
      } catch (err) {
        console.warn('Logo overlay skipped:', err.message);
      }
    } else {
      console.warn('Logo not found at', logoPath);
    }

    res.setHeader('Content-Type', 'image/png');
    res.send(finalBuffer);
  } catch (error) {
    console.error('QR Error:', error);
    // Send a proper error response – but as an image we can't easily show JSON, so we send a 500 with text.
    res.status(500).json({ success: false, message: 'QR generation failed' });
  }
};