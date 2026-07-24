const QRCode = require('qrcode');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver'); 
const prisma = require('../prisma');
const jwt = require('jsonwebtoken');
const AdmZip = require('adm-zip');

// ─── Single QR ──────────────────────────────────────────────────────
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

    const qrData = JSON.stringify({
      id: member.id,
      name: member.fullName,
      fellowship: member.fellowship?.name || 'Unknown',
    });

    const qrBuffer = await QRCode.toBuffer(qrData, {
      errorCorrectionLevel: 'H',
      width: 400,
      margin: 2,
    });

    const logoPath = path.join(__dirname, '../../assets/fountain.jpg');
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
    res.status(500).json({ success: false, message: 'QR generation failed' });
  }
};

// ─── Batch QR ──────────────────────────────────────────────────────
eexports.generateBatchQR = async (req, res) => {
  try {
    const token = req.query.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
    let decoded;
    try { decoded = jwt.verify(token, process.env.JWT_SECRET); } catch { return res.status(401).json({ success: false, message: 'Invalid token' }); }
    if (decoded.role !== 'ADMIN') return res.status(403).json({ success: false, message: 'Admin only' });

    const { fellowshipId } = req.query;
    const where = { isActive: true };
    if (fellowshipId) where.fellowshipId = fellowshipId;

    const members = await prisma.member.findMany({ where, include: { fellowship: true }, orderBy: { fullName: 'asc' } });
    if (members.length === 0) return res.status(404).json({ success: false, message: 'No active members found.' });

    const zip = new AdmZip();
    const logoPath = path.join(__dirname, '../../assets/fountain.jpg');

    for (const member of members) {
      const qrData = JSON.stringify({ id: member.id, name: member.fullName, fellowship: member.fellowship?.name || 'Unknown' });
      let qrBuffer = await QRCode.toBuffer(qrData, { errorCorrectionLevel: 'H', width: 300, margin: 2 });
      let finalBuffer = qrBuffer;
      if (fs.existsSync(logoPath)) {
        try {
          const logo = await sharp(logoPath).resize(60, 60, { fit: 'cover' }).toBuffer();
          finalBuffer = await sharp(qrBuffer).composite([{ input: logo, gravity: 'centre' }]).png().toBuffer();
        } catch (err) { console.warn(`Logo overlay failed for ${member.fullName}:`, err.message); }
      }
      const safeName = member.fullName.replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `${safeName}_${member.id.slice(0, 8)}.png`;
      zip.addFile(filename, finalBuffer);
    }

    const zipBuffer = zip.toBuffer();
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=member_qr_codes.zip');
    res.send(zipBuffer);
  } catch (error) {
    console.error('Batch QR Error:', error);
    if (!res.headersSent) res.status(500).json({ success: false, message: 'Failed to generate batch QR codes.' });
  }
};