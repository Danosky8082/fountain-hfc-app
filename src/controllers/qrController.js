const QRCode = require('qrcode');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const prisma = require('../prisma');

exports.generateMemberQR = async (req, res) => {
  try {
    const { memberId } = req.params;

    // Fetch member to ensure existence
    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: { fellowship: true },
    });

    if (!member) {
      return res.status(404).json({ success: false, message: 'Member not found' });
    }

    // The QR code content: we'll store the member ID (or QR unique ID)
    const qrData = member.id; // Or member.qrUniqueId

    // Generate QR code as a buffer (PNG)
    const qrBuffer = await QRCode.toBuffer(qrData, {
      errorCorrectionLevel: 'H', // High error correction to allow logo overlay
      margin: 1,
      width: 300,
    });

    // Path to logo image (public folder in frontend, but we need it accessible from backend)
    // We'll store a copy in backend assets.
    const logoPath = path.join(__dirname, '../../assets/logo.png'); // We'll create this folder
    // If you prefer, you can use the frontend's public logo, but better to copy.
    // For now, we'll assume you placed logo.png in backend/assets/

    // Create a temporary file for the QR code
    const qrTempPath = path.join(__dirname, '../../temp_qr.png');
    fs.writeFileSync(qrTempPath, qrBuffer);

    // Overlay logo using sharp
    const finalBuffer = await sharp(qrTempPath)
      .composite([
        {
          input: logoPath,
          gravity: 'centre',
          blend: 'over',
        },
      ])
      .png()
      .toBuffer();

    // Clean up temp file
    fs.unlinkSync(qrTempPath);

    // Send the final QR as image
    res.setHeader('Content-Type', 'image/png');
    res.send(finalBuffer);
  } catch (error) {
    console.error('QR Generation Error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate QR' });
  }
};