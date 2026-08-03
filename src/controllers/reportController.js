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

  // ─── Create PDF with proper settings ───
  const doc = new PDFDocument({ 
    size: 'A4', 
    margin: 50,
    info: {
      Title: `HFC Report - ${report.fellowship?.name || 'Unknown'}`,
      Author: 'Fountain of Life HFC System',
    }
  });
  
  const chunks = [];
  doc.on('data', (chunk) => chunks.push(chunk));
  doc.on('end', () => {});

  // ─── Helper Functions ──────────────────────────────────────
  const formatDate = (date) => {
    if (!date) return '—';
    try { 
      const d = new Date(date);
      // Force UTC to avoid timezone issues
      return d.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric',
        timeZone: 'UTC'
      }); 
    } catch { 
      return '—'; 
    }
  };

  // ─── Draw a field with label and value ──────────────────────
  const drawField = (label, value, y, labelWidth = 250) => {
    doc
      .fontSize(10)
      .font('Helvetica-Bold')
      .fillColor('#1a1a2e')
      .text(label, 50, y, { continued: false, width: labelWidth });
    doc
      .font('Helvetica')
      .fillColor('#333')
      .text(value || '—', labelWidth + 50, y, { width: 250 });
    return doc.y + 5;
  };

  const fellowshipName = report.fellowship?.name || 'Unknown';
  const leaderName = report.fellowship?.leader?.fullName || '—';
  const leaderEmail = report.fellowship?.leader?.email || '—';
  const associateName = report.fellowship?.associate?.fullName || '—';
  const associateEmail = report.fellowship?.associate?.email || '—';

  // ─── Page 1: Header ──────────────────────────────────────────
  let y = 50;

  // Title
  doc
    .fontSize(20)
    .font('Helvetica-Bold')
    .fillColor('#1a1a2e')
    .text('MONTHLY FOUNTAIN OF LIFE', { align: 'center' })
    .moveDown(0.3);
  
  doc
    .fontSize(16)
    .font('Helvetica-Bold')
    .text('HOME FELLOWSHIP CENTRE REPORT', { align: 'center' })
    .moveDown(0.5);

  doc
    .fontSize(10)
    .font('Helvetica-Oblique')
    .fillColor('#666')
    .text('Kindly fill this monthly HFC report.', { align: 'center' })
    .moveDown(1);

  // Divider
  y = doc.y;
  doc
    .strokeColor('#c0a85d')
    .lineWidth(2)
    .moveTo(50, y)
    .lineTo(545, y)
    .stroke();
  y += 15;

  // ─── Fellowship Information ──────────────────────────────────
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const [year, month] = report.monthYear.split('-');
  const monthName = monthNames[parseInt(month) - 1];

  doc.y = y;
  y = drawField('REPORT FOR THE MONTH OF', `${monthName} ${year}`, y);
  y = drawField('NAME OF HOME FELLOWSHIP', fellowshipName, y);
  y = drawField('NAME OF HOME FELLOWSHIP LEADER', leaderName, y);
  y = drawField('HFL Email', leaderEmail, y);
  y = drawField('NAME OF ASSOCIATE HOME FELLOWSHIP LEADER', associateName, y);
  y = drawField('Associate HFL Email', associateEmail, y);
  y += 10;

  // ─── Weekly Attendance Table ─────────────────────────────────
  doc
    .fontSize(14)
    .font('Helvetica-Bold')
    .fillColor('#1a1a2e')
    .text('WEEKLY ATTENDANCE', { underline: true })
    .moveDown(0.5);

  // Table setup
  const tableTop = doc.y;
  const col1 = 50;
  const col2 = 200;
  const col3 = 350;
  const col4 = 460;
  const rowHeight = 25;

  // Table header
  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .fillColor('#1a1a2e')
    .text('Week', col1, tableTop, { width: 80 })
    .text('Meeting Date', col2, tableTop, { width: 140 })
    .text('No. of Members', col3, tableTop, { width: 160 });

  // Header underline
  const headerY = tableTop + 20;
  doc
    .strokeColor('#ddd')
    .lineWidth(1)
    .moveTo(col1, headerY)
    .lineTo(col4, headerY)
    .stroke();

  // Table rows
  const weeks = [
    { num: 1, date: report.week1Date, count: report.week1Count || 0 },
    { num: 2, date: report.week2Date, count: report.week2Count || 0 },
    { num: 3, date: report.week3Date, count: report.week3Count || 0 },
    { num: 4, date: report.week4Date, count: report.week4Count || 0 },
    { num: 5, date: report.week5Date, count: report.week5Count || 0 },
  ];

  let rowY = headerY + 10;
  weeks.forEach((week) => {
    doc
      .fontSize(10)
      .font('Helvetica')
      .fillColor('#333')
      .text(`Week ${week.num}`, col1, rowY, { width: 80 })
      .text(formatDate(week.date), col2, rowY, { width: 140 })
      .text(week.count.toString(), col3, rowY, { width: 160 });
    rowY += rowHeight;
  });

  doc.y = rowY + 10;

  // ─── Pastoral Care Section ────────────────────────────────────
  doc
    .fontSize(14)
    .font('Helvetica-Bold')
    .fillColor('#1a1a2e')
    .text('PASTORAL CARE', { underline: true })
    .moveDown(0.5);

  doc.y = drawField('I PRAYED FOR EVERY MEMBER... AT LEAST ONCE A WEEK', 
    report.prayerFlag ? 'YES' : 'NO', doc.y, 350);
  doc.y += 5;

  // ─── Growth & Follow-up ──────────────────────────────────────
  doc
    .fontSize(14)
    .font('Helvetica-Bold')
    .fillColor('#1a1a2e')
    .text('GROWTH & FOLLOW-UP', { underline: true })
    .moveDown(0.5);

  doc.y = drawField('FIRST TIMERS OR NEW CONVERTS', 
    report.firstTimers?.toString() || '0', doc.y, 300);
  doc.y = drawField('NEW MEMBERS JOINED', 
    report.newMembers?.toString() || '0', doc.y, 300);
  doc.y = drawField('FOLLOW-UPS', 
    report.followUps?.toString() || '0', doc.y, 300);
  doc.y += 5;

  // ─── Issues & Feedback ──────────────────────────────────────
  doc
    .fontSize(14)
    .font('Helvetica-Bold')
    .fillColor('#1a1a2e')
    .text('ISSUES & FEEDBACK', { underline: true })
    .moveDown(0.5);

  doc.y = drawField('ISSUES FOR ESCALATION', 
    report.escalations || 'None reported', doc.y, 250);
  doc.y = drawField('COMMENTS / FEEDBACK', 
    report.comments || 'None', doc.y, 250);
  doc.y += 10;

  // ─── Status and Footer ──────────────────────────────────────
  const statusText = report.status === 'FINALIZED' ? 'FINALIZED' : 'DRAFT';
  doc
    .fontSize(10)
    .font('Helvetica-Oblique')
    .fillColor('#888')
    .text(`Status: ${statusText}`, 50, doc.y);

  // Footer line
  doc
    .strokeColor('#c0a85d')
    .lineWidth(1)
    .moveTo(50, 750)
    .lineTo(545, 750)
    .stroke();

  // Footer text
  doc
    .fontSize(8)
    .font('Helvetica')
    .fillColor('#999')
    .text(
      `Generated by Fountain of Life HFC System • ${new Date().toLocaleString()}`,
      50, 760,
      { align: 'center' }
    );

  doc.end();

  return new Promise((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });
};

// ─── Get Current Report ────────────────────────────────────────
exports.getCurrentReport = async (req, res) => {
  try {
    const { fellowshipId, userId, role } = req.user;
    
    console.log(`📊 [REPORT] Getting report for fellowship ${fellowshipId}`);
    
    if (!fellowshipId && role !== 'ADMIN' && role !== 'HOD') {
      return res.status(400).json({ 
        success: false, 
        message: 'No fellowship assigned to this user. Please contact admin.' 
      });
    }

    const now = new Date();
    const monthYear = now.toISOString().slice(0, 7);

    // First, check if there are any submitted sessions
    const submittedSessions = await prisma.attendanceSession.findMany({
      where: {
        fellowshipId: fellowshipId,
        monthYear: monthYear,
        isSubmitted: true,
      },
      include: { records: true },
      orderBy: { weekNumber: 'asc' },
    });

    console.log(`📊 [REPORT] Found ${submittedSessions.length} submitted sessions`);

    // Calculate counts from sessions
    const weekCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const weekDates = { 1: null, 2: null, 3: null, 4: null, 5: null };
    
    submittedSessions.forEach((s) => {
      if (s.weekNumber >= 1 && s.weekNumber <= 5) {
        weekCounts[s.weekNumber] = s.records.length;
        weekDates[s.weekNumber] = s.meetingDate;
        console.log(`📊 [REPORT] Week ${s.weekNumber}: ${s.records.length} members present`);
      }
    });

    // Find or create report
    let report = await prisma.monthlyReport.findUnique({
      where: {
        fellowshipId_monthYear: {
          fellowshipId: fellowshipId,
          monthYear: monthYear,
        },
      },
      include: {
        fellowship: {
          include: {
            leader: true,
            associate: true,
          },
        },
      },
    });

    if (report) {
      // Update existing report
      report = await prisma.monthlyReport.update({
        where: { id: report.id },
        data: {
          week1Date: weekDates[1],
          week2Date: weekDates[2],
          week3Date: weekDates[3],
          week4Date: weekDates[4],
          week5Date: weekDates[5],
          week1Count: weekCounts[1],
          week2Count: weekCounts[2],
          week3Count: weekCounts[3],
          week4Count: weekCounts[4],
          week5Count: weekCounts[5],
        },
        include: {
          fellowship: {
            include: {
              leader: true,
              associate: true,
            },
          },
        },
      });
    } else {
      // Create new report
      report = await prisma.monthlyReport.create({
        data: {
          fellowshipId: fellowshipId,
          monthYear: monthYear,
          week1Date: weekDates[1],
          week2Date: weekDates[2],
          week3Date: weekDates[3],
          week4Date: weekDates[4],
          week5Date: weekDates[5],
          week1Count: weekCounts[1],
          week2Count: weekCounts[2],
          week3Count: weekCounts[3],
          week4Count: weekCounts[4],
          week5Count: weekCounts[5],
          status: 'DRAFT',
        },
        include: {
          fellowship: {
            include: {
              leader: true,
              associate: true,
            },
          },
        },
      });
    }

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    console.error('Get Report Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to generate report.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ─── Update Report ─────────────────────────────────────────────
exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role, fellowshipId: userFellowshipId } = req.user;
    const {
      prayerFlag,
      firstTimers,
      newMembers,
      followUps,
      escalations,
      comments,
      action = 'SAVE',
    } = req.body;

    console.log('📝 updateReport:', { id, action, userId, role });

    const existing = await prisma.monthlyReport.findUnique({
      where: { id },
      include: { fellowship: true },
    });

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Report not found.' });
    }

    // Check authorization
    const isAuthorized = 
      role === 'ADMIN' || 
      role === 'HOD' || 
      userFellowshipId === existing.fellowshipId;

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to edit this report.',
      });
    }

    // Handle RESET_TO_DRAFT
    if (action === 'RESET_TO_DRAFT') {
      if (existing.status !== 'FINALIZED') {
        return res.status(400).json({
          success: false,
          message: 'Only finalized reports can be reset to draft.',
        });
      }

      const updated = await prisma.monthlyReport.update({
        where: { id },
        data: {
          status: 'DRAFT',
          finalizedAt: null,
          finalizedBy: null,
        },
        include: {
          fellowship: {
            include: {
              leader: true,
              associate: true,
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        message: 'Report reset to draft successfully.',
        data: updated,
      });
    }

    // For SAVE / FINALIZE
    if (existing.status === 'FINALIZED') {
      return res.status(400).json({
        success: false,
        message: 'This report is already finalized and cannot be edited.',
      });
    }

    const updateData = {
      prayerFlag: prayerFlag !== undefined ? prayerFlag : existing.prayerFlag,
      firstTimers: firstTimers !== undefined ? firstTimers : existing.firstTimers,
      newMembers: newMembers !== undefined ? newMembers : existing.newMembers,
      followUps: followUps !== undefined ? followUps : existing.followUps,
      escalations: escalations !== undefined ? escalations : existing.escalations,
      comments: comments !== undefined ? comments : existing.comments,
    };

    if (action === 'FINALIZE') {
      updateData.status = 'FINALIZED';
      updateData.finalizedAt = new Date();
      updateData.finalizedBy = userId;
    }

    const updated = await prisma.monthlyReport.update({
      where: { id },
      data: updateData,
      include: {
        fellowship: {
          include: {
            leader: true,
            associate: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: action === 'FINALIZE' ? '✅ Report finalized successfully!' : '💾 Draft saved!',
      data: updated,
    });
  } catch (error) {
    console.error('❌ Update Report Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update report.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ─── Get All Reports (HOD Dashboard) ──────────────────────────
exports.getAllReports = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== 'HOD' && role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Only HOD or Admin can access this endpoint.',
      });
    }

    const { monthYear } = req.query;
    const targetMonth = monthYear || new Date().toISOString().slice(0, 7);

    const reports = await prisma.monthlyReport.findMany({
      where: { monthYear: targetMonth },
      include: {
        fellowship: {
          include: {
            leader: true,
            associate: true,
          },
        },
      },
      orderBy: {
        fellowship: { name: 'asc' },
      },
    });

    res.status(200).json({
      success: true,
      count: reports.length,
      monthYear: targetMonth,
      data: reports,
    });
  } catch (error) {
    console.error('Get All Reports Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reports.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ─── Generate PDF ──────────────────────────────────────────────
exports.generatePDF = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check for token in query string OR headers
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

    // Verify token
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

    // Get user from database
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

    // Get report
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

    // Check authorization
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

    // Generate PDF
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

// ─── Export CSV ────────────────────────────────────────────────
exports.exportCSV = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== 'HOD' && role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Only HOD or Admin can export CSV.',
      });
    }

    const { monthYear } = req.query;
    const targetMonth = monthYear || new Date().toISOString().slice(0, 7);

    const reports = await prisma.monthlyReport.findMany({
      where: { monthYear: targetMonth },
      include: { fellowship: true },
      orderBy: { fellowship: { name: 'asc' } },
    });

    let csv = 'Fellowship,Month,Week1,Week2,Week3,Week4,Week5,Status\n';
    reports.forEach((r) => {
      csv += `${r.fellowship.name},${r.monthYear},${r.week1Count},${r.week2Count},${r.week3Count},${r.week4Count},${r.week5Count},${r.status}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=reports_${targetMonth}.csv`);
    res.send(csv);
  } catch (error) {
    console.error('CSV Export Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export CSV.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ─── Get Single Report by ID ──────────────────────────────────
exports.getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role, fellowshipId: userFellowshipId } = req.user;

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
      return res.status(404).json({ success: false, message: 'Report not found.' });
    }

    // Check authorization
    const isAuthorized = 
      role === 'ADMIN' || 
      role === 'HOD' || 
      userFellowshipId === report.fellowshipId;

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this report.',
      });
    }

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    console.error('Get Report By ID Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch report.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};