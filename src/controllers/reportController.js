// src/controllers/reportController.js
const prisma = require('../prisma');
const PDFDocument = require('pdfkit');
const jwt = require('jsonwebtoken');

// ─── Helper: Generate PDF Buffer ──────────────────────────────
const generatePDFBuffer = async (reportId) => {
  const report = await prisma.monthlyReport.findUnique({
    where: { id: reportId },
    include: {
      fellowship: {
        include: {
          leader: true,
          associate: true,
        },
      },
    },
  });

  if (!report) throw new Error('Report not found');

  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  const chunks = [];
  doc.on('data', (chunk) => chunks.push(chunk));
  doc.on('end', () => {});

  const formatDate = (date) => {
    if (!date) return '—';
    try { return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); } catch { return '—'; }
  };
  const fellowshipName = report.fellowship?.name || 'Unknown';
  const leaderName = report.fellowship?.leader?.fullName || '—';
  const leaderEmail = report.fellowship?.leader?.email || '—';
  const associateName = report.fellowship?.associate?.fullName || '—';
  const associateEmail = report.fellowship?.associate?.email || '—';

  // Header
  doc
    .fontSize(18)
    .font('Helvetica-Bold')
    .fillColor('#1a1a2e')
    .text('MONTHLY FOUNTAIN OF LIFE', { align: 'center' })
    .fontSize(16)
    .text('HOME FELLOWSHIP CENTRE REPORT', { align: 'center' })
    .moveDown(0.5);

  doc
    .fontSize(10)
    .font('Helvetica-Oblique')
    .fillColor('#555')
    .text('Kindly fill this monthly HFC report.', { align: 'center' })
    .moveDown(1);

  doc
    .strokeColor('#c0a85d')
    .lineWidth(2)
    .moveTo(50, doc.y)
    .lineTo(545, doc.y)
    .stroke()
    .moveDown(1);

  // Fellowship Information
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const [year, month] = report.monthYear.split('-');
  const monthName = monthNames[parseInt(month) - 1];

  const drawField = (label, value, y) => {
    doc
      .fontSize(11)
      .font('Helvetica-Bold')
      .fillColor('#000')
      .text(label, 50, y, { continued: false });
    doc
      .font('Helvetica')
      .fillColor('#222')
      .text(value || '—', 250, y, { width: 300 })
      .moveDown(0.3);
    return doc.y;
  };

  let yPos = doc.y;
  yPos = drawField('REPORT FOR THE MONTH OF', `${monthName} ${year}`, yPos);
  yPos = drawField('NAME OF HOME FELLOWSHIP', fellowshipName, yPos);
  yPos = drawField('NAME OF HOME FELLOWSHIP LEADER', leaderName, yPos);
  yPos = drawField('HFL Email', leaderEmail, yPos);
  yPos = drawField('NAME OF ASSOCIATE HOME FELLOWSHIP LEADER', associateName, yPos);
  yPos = drawField('Associate HFL Email', associateEmail, yPos);

  doc.moveDown(0.5);

  // Weekly Attendance Table
  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .fillColor('#1a1a2e')
    .text('📊 WEEKLY ATTENDANCE')
    .moveDown(0.3);

  const col1 = 50, col2 = 220, col3 = 380;
  let tableY = doc.y;
  const rowHeight = 25;

  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .fillColor('#1a1a2e')
    .text('Week', col1, tableY, { width: 80 })
    .text('Meeting Date', col2, tableY, { width: 140 })
    .text('No. of Members', col3, tableY, { width: 160 });
  tableY += 20;
  doc
    .strokeColor('#ddd')
    .lineWidth(1)
    .moveTo(col1, tableY - 5)
    .lineTo(col1 + 450, tableY - 5)
    .stroke();

  const weeks = [
    { num: 1, date: report.week1Date, count: report.week1Count },
    { num: 2, date: report.week2Date, count: report.week2Count },
    { num: 3, date: report.week3Date, count: report.week3Count },
    { num: 4, date: report.week4Date, count: report.week4Count },
    { num: 5, date: report.week5Date, count: report.week5Count },
  ];

  weeks.forEach((week) => {
    doc
      .fontSize(10)
      .font('Helvetica')
      .fillColor('#000')
      .text(`Week ${week.num}`, col1, tableY, { width: 80 })
      .text(formatDate(week.date), col2, tableY, { width: 140 })
      .text(week.count.toString(), col3, tableY, { width: 160 });
    tableY += rowHeight;
  });

  doc.moveDown(0.5);
  doc.y = tableY + 10;

  // Pastoral Care & Follow-up
  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .fillColor('#1a1a2e')
    .text('🙏 PASTORAL CARE')
    .moveDown(0.3);
  yPos = doc.y;
  yPos = drawField('I PRAYED FOR EVERY MEMBER... AT LEAST ONCE A WEEK', report.prayerFlag ? '✅ YES' : '❌ NO', yPos);
  doc.moveDown(0.5);

  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .fillColor('#1a1a2e')
    .text('📈 GROWTH & FOLLOW-UP')
    .moveDown(0.3);
  yPos = doc.y;
  yPos = drawField('FIRST TIMERS OR NEW CONVERTS', report.firstTimers.toString(), yPos);
  yPos = drawField('NEW MEMBERS JOINED', report.newMembers.toString(), yPos);
  yPos = drawField('FOLLOW-UPS', report.followUps.toString(), yPos);

  doc.moveDown(0.5);
  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .fillColor('#1a1a2e')
    .text('⚠️ ISSUES & FEEDBACK')
    .moveDown(0.3);
  yPos = doc.y;
  yPos = drawField('ISSUES FOR ESCALATION', report.escalations || 'None reported', yPos);
  yPos = drawField('COMMENTS / FEEDBACK', report.comments || 'None', yPos);

  doc.moveDown(1);
  const statusText = report.status === 'FINALIZED' ? '✅ FINALIZED' : '📝 DRAFT';
  doc
    .fontSize(9)
    .font('Helvetica-Oblique')
    .fillColor('#888')
    .text(`Status: ${statusText}`, 50, doc.y);

  doc
    .strokeColor('#c0a85d')
    .lineWidth(1)
    .moveTo(50, 750)
    .lineTo(545, 750)
    .stroke();

  doc
    .fontSize(8)
    .font('Helvetica')
    .fillColor('#999')
    .text(`Generated by Fountain of Life HFC System • ${new Date().toLocaleString()}`, 50, 760, { align: 'center' });

  doc.end();

  return new Promise((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });
};

// ─── Generate PDF (for download) ──────────────────────────────
exports.generatePDF = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ─── FIX: Check for token in query string OR headers ───
    const token = req.query.token || req.headers.authorization?.split(' ')[1];
    
    console.log('📄 PDF Request - Token present:', !!token);
    console.log('📄 PDF Request - Report ID:', id);
    
    if (!token) {
      console.log('❌ No token found in request');
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized - No token provided' 
      });
    }

    // ─── Verify token ───
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Token verified for user:', decoded.userId);
    } catch (err) {
      console.log('❌ Invalid token:', err.message);
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }

    // ─── Get user from database ───
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { leading: true, assisting: true },
    });

    if (!user) {
      console.log('❌ User not found:', decoded.userId);
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // ─── Get report ───
    const report = await prisma.monthlyReport.findUnique({
      where: { id },
      include: {
        fellowship: {
          include: {
            leader: true,
            associate: true,
          },
        },
      },
    });

    if (!report) {
      console.log('❌ Report not found:', id);
      return res.status(404).json({ 
        success: false, 
        message: 'Report not found' 
      });
    }

    // ─── Check authorization ───
    const userFellowshipId = user.leading?.id || user.assisting?.id;
    const isAuthorized = 
      user.role === 'ADMIN' || 
      user.role === 'HOD' || 
      userFellowshipId === report.fellowshipId;

    if (!isAuthorized) {
      console.log('❌ Unauthorized access - User:', user.role, 'Report:', report.fellowshipId);
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this report',
      });
    }

    console.log('✅ Generating PDF for report:', id);

    const filename = `HFC_Report_${report.fellowship.name}_${report.monthYear}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // ─── Generate PDF ───
    const pdfBuffer = await generatePDFBuffer(id);
    res.send(pdfBuffer);
    
    console.log('✅ PDF generated successfully:', filename);
  } catch (error) {
    console.error('❌ PDF Generation Error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Failed to generate PDF.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};