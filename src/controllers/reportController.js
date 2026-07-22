// src/controllers/reportController.js
const prisma = require('../prisma');
const PDFDocument = require('pdfkit');

/**
 * GET /api/reports/current
 * Generates or fetches the current month's draft report for the logged-in FL.
 * This auto-aggregates attendance from all submitted weeks.
 */
exports.getCurrentReport = async (req, res) => {
  try {
    const { fellowshipId, userId, role } = req.user;
    const now = new Date();
    const monthYear = now.toISOString().slice(0, 7); // "2026-07"

    // 1. Check if a report already exists for this month
    let report = await prisma.monthlyReport.findUnique({
      where: {
        fellowshipId_monthYear: {
          fellowshipId,
          monthYear,
        },
      },
    });

    // 2. If no report exists, generate one from attendance sessions
    if (!report) {
      // Fetch all attendance sessions for this fellowship & month
      const sessions = await prisma.attendanceSession.findMany({
        where: {
          fellowshipId,
          monthYear,
          isSubmitted: true, // Only include submitted weeks
        },
        orderBy: { weekNumber: 'asc' },
      });

      // Prepare week data
      const weekData = { 1: null, 2: null, 3: null, 4: null, 5: null };
      sessions.forEach((session) => {
        weekData[session.weekNumber] = {
          date: session.meetingDate,
          count: session.records?.length || 0, // Note: records are not populated here, we'll count separately
        };
      });

      // Count records per session (since Prisma doesn't auto-populate count in findMany unless we include)
      // Better to fetch with include or do a separate query – let's do a single query with include
      const sessionsWithCounts = await prisma.attendanceSession.findMany({
        where: {
          fellowshipId,
          monthYear,
          isSubmitted: true,
        },
        include: {
          records: true, // Include records to count them
        },
        orderBy: { weekNumber: 'asc' },
      });

      const weekCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      const weekDates = { 1: null, 2: null, 3: null, 4: null, 5: null };
      sessionsWithCounts.forEach((s) => {
        weekCounts[s.weekNumber] = s.records.length;
        weekDates[s.weekNumber] = s.meetingDate;
      });

      // Create the report
      report = await prisma.monthlyReport.create({
        data: {
          fellowshipId,
          monthYear,
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
      });
    }

    // 3. Fetch the report with fellowship details
    const fullReport = await prisma.monthlyReport.findUnique({
      where: { id: report.id },
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
      data: fullReport,
    });
  } catch (error) {
    console.error('Get Report Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate report.',
    });
  }
};

/**
 * PUT /api/reports/:id
 * Updates a report with the extra form fields and optionally finalizes it.
 * Body: { prayerFlag, firstTimers, newMembers, followUps, escalations, comments, action: "SAVE" | "FINALIZE" }
 */
exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    const {
      prayerFlag,
      firstTimers,
      newMembers,
      followUps,
      escalations,
      comments,
      action = 'SAVE',
    } = req.body;

    // 1. Verify the report exists and belongs to this user's fellowship
    const existing = await prisma.monthlyReport.findUnique({
      where: { id },
      include: { fellowship: true },
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Report not found.',
      });
    }

    // Security: Ensure the user belongs to this fellowship
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { leadingId: true, assistingId: true, role: true },
    });

    const isAuthorized =
      user?.leadingId === existing.fellowshipId ||
      user?.assistingId === existing.fellowshipId ||
      user?.role === 'HOD' ||
      user?.role === 'ADMIN';

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to edit this report.',
      });
    }

    // 2. Prevent editing if already finalized
    if (existing.status === 'FINALIZED') {
      return res.status(400).json({
        success: false,
        message: 'This report is already finalized and cannot be edited.',
      });
    }

    // 3. Prepare update data
    const updateData = {
      prayerFlag: prayerFlag !== undefined ? prayerFlag : existing.prayerFlag,
      firstTimers: firstTimers !== undefined ? firstTimers : existing.firstTimers,
      newMembers: newMembers !== undefined ? newMembers : existing.newMembers,
      followUps: followUps !== undefined ? followUps : existing.followUps,
      escalations: escalations !== undefined ? escalations : existing.escalations,
      comments: comments !== undefined ? comments : existing.comments,
    };

    // 4. If action is "FINALIZE", set status to FINALIZED
    if (action === 'FINALIZE') {
      // Validate that required fields are filled (optional but good practice)
      if (updateData.prayerFlag === false && existing.prayerFlag === false) {
        // Allow it, but maybe warn? We'll just let it pass.
      }
      updateData.status = 'FINALIZED';
      updateData.finalizedAt = new Date();
      updateData.finalizedBy = userId;
    }

    // 5. Update the report
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
      message: action === 'FINALIZE' ? '✅ Report finalized successfully!' : '✅ Report saved successfully!',
      data: updated,
    });
  } catch (error) {
    console.error('Update Report Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update report.',
    });
  }
};

/**
 * GET /api/reports/all
 * HOD/Admin only – fetches all reports for the current month (or a specific month).
 * Query params: ?monthYear=2026-07
 */
exports.getAllReports = async (req, res) => {
  if (role !== 'HOD' && role !== 'ADMIN') {
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  }
  try {
    const { role } = req.user;
    const { monthYear } = req.query;

    // Only HOD or ADMIN can view all reports
    if (role !== 'HOD' && role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Only HOD or Admin can access this endpoint.',
      });
    }

    const targetMonth = monthYear || new Date().toISOString().slice(0, 7);

    const reports = await prisma.monthlyReport.findMany({
      where: {
        monthYear: targetMonth,
      },
      include: {
        fellowship: {
          include: {
            leader: true,
            associate: true,
          },
        },
      },
      orderBy: {
        fellowship: {
          name: 'asc',
        },
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
    });
  }
};

/**
 * GET /api/reports/:id/pdf
 * Generates a formatted PDF report matching the original Fountain of Life form.
 */
exports.generatePDF = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;

    // 1. Fetch the report with all related data
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
      return res.status(404).json({
        success: false,
        message: 'Report not found.',
      });
    }

    // 2. Authorization check
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { leadingId: true, assistingId: true, role: true },
    });

    const isAuthorized =
      user?.leadingId === report.fellowshipId ||
      user?.assistingId === report.fellowshipId ||
      user?.role === 'HOD' ||
      user?.role === 'ADMIN';

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this report.',
      });
    }

    // 3. Create a PDF document
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      info: {
        Title: `HFC Report - ${report.fellowship.name} - ${report.monthYear}`,
        Author: 'Fountain of Life HFC System',
      },
    });

    // Set response headers for PDF download
    const filename = `HFC_Report_${report.fellowship.name}_${report.monthYear}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Pipe the PDF directly to the response
    doc.pipe(res);

    // 4. Helper function to format date
    const formatDate = (date) => {
      if (!date) return '—';
      const d = new Date(date);
      return d.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    };

    // 5. Build the PDF content
    // --- Header ---
    doc
      .fontSize(18)
      .font('Helvetica-Bold')
      .fillColor('#1a1a2e')
      .text('MONTHLY FOUNTAIN OF LIFE', { align: 'center' })
      .fontSize(16)
      .text('HOME FELLOWSHIP CENTRE REPORT', { align: 'center' })
      .moveDown(0.5);

    // Subtitle: Kindly fill this monthly HFC report.
    doc
      .fontSize(10)
      .font('Helvetica-Oblique')
      .fillColor('#555')
      .text('Kindly fill this monthly HFC report.', { align: 'center' })
      .moveDown(1);

    // Separator line
    doc
      .strokeColor('#c0a85d')
      .lineWidth(2)
      .moveTo(50, doc.y)
      .lineTo(545, doc.y)
      .stroke()
      .moveDown(1);

    // --- Form Fields (Table Style) ---
    const startX = 50;
    let yPos = doc.y;

    // Helper: Draw a field row
    const drawField = (label, value, y, x = startX) => {
      doc
        .fontSize(11)
        .font('Helvetica-Bold')
        .fillColor('#000')
        .text(label, x, y, { continued: false });

      doc
        .font('Helvetica')
        .fillColor('#222')
        .text(value || '—', x + 200, y, { width: 300 })
        .moveDown(0.3);
      return doc.y;
    };

    // Helper: Draw a section header
    const drawSection = (text) => {
      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .fillColor('#1a1a2e')
        .text(text)
        .moveDown(0.3);
      return doc.y;
    };

    // --- Section 1: Basic Info ---
    yPos = drawSection('📋 FELLOWSHIP INFORMATION');
    
    // Month
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const [year, month] = report.monthYear.split('-');
    const monthName = monthNames[parseInt(month) - 1];
    yPos = drawField('REPORT FOR THE MONTH OF', `${monthName} ${year}`, yPos);
    
    yPos = drawField('NAME OF HOME FELLOWSHIP', report.fellowship.name, yPos);
    yPos = drawField('NAME OF HOME FELLOWSHIP LEADER', report.fellowship.leader?.fullName || '—', yPos);
    yPos = drawField('HFL Email', report.fellowship.leader?.email || '—', yPos);
    yPos = drawField('NAME OF ASSOCIATE HOME FELLOWSHIP LEADER', report.fellowship.associate?.fullName || '—', yPos);
    yPos = drawField('Associate HFL Email', report.fellowship.associate?.email || '—', yPos);

    doc.moveDown(0.5);

    // --- Section 2: Weekly Attendance ---
    yPos = drawSection('📊 WEEKLY ATTENDANCE');

    // Create a table-like structure manually with coordinates for alignment
    const tableX = 50;
    let tableY = doc.y;
    const col1 = 50;
    const col2 = 220;
    const col3 = 380;
    const rowHeight = 25;

    // Table Header
    doc
      .fontSize(10)
      .font('Helvetica-Bold')
      .fillColor('#1a1a2e')
      .text('Week', col1, tableY, { width: 80 })
      .text('Meeting Date', col2, tableY, { width: 140 })
      .text('No. of Members (In Figures)', col3, tableY, { width: 160 });

    tableY += 20;
    doc
      .strokeColor('#ddd')
      .lineWidth(1)
      .moveTo(col1, tableY - 5)
      .lineTo(col1 + 450, tableY - 5)
      .stroke();

    // Week rows
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

    // --- Section 3: Prayer & Follow-up ---
    yPos = drawSection('🙏 PASTORAL CARE');
    
    const prayerText = report.prayerFlag ? '✅ YES' : '❌ NO';
    yPos = drawField('I PRAYED FOR EVERY MEMBER... AT LEAST ONCE A WEEK', prayerText, yPos);

    doc.moveDown(0.5);
    yPos = drawSection('📈 GROWTH & FOLLOW-UP');
    
    yPos = drawField('FIRST TIMERS OR NEW CONVERTS JOINED THIS MONTH', report.firstTimers.toString(), yPos);
    yPos = drawField('GENERALLY, HOW MANY NEW MEMBERS JOINED', report.newMembers.toString(), yPos);
    yPos = drawField('HOW MANY FELLOWSHIP MEMBERS DID YOU FOLLOW UP', report.followUps.toString(), yPos);

    doc.moveDown(0.5);

    // --- Section 4: Issues & Comments ---
    yPos = drawSection('⚠️ ISSUES & FEEDBACK');
    
    yPos = drawField('ANY ISSUES FOR ESCALATION', report.escalations || 'None reported', yPos);
    yPos = drawField('COMMENTS / FEEDBACK / QUESTIONS', report.comments || 'None', yPos);

    doc.moveDown(1);

    // --- Footer: Status & Timestamp ---
    const statusText = report.status === 'FINALIZED' ? '✅ FINALIZED' : '📝 DRAFT';
    const finalizedBy = report.finalizedBy 
      ? await prisma.user.findUnique({ where: { id: report.finalizedBy } })
      : null;
    const finalizedByName = finalizedBy ? finalizedBy.fullName : '—';

    doc
      .fontSize(9)
      .font('Helvetica-Oblique')
      .fillColor('#888')
      .text(`Status: ${statusText}`, 50, doc.y, { continued: true })
      .text(` | Finalized by: ${finalizedName}`, { continued: false });

    if (report.finalizedAt) {
      doc.text(`Finalized on: ${new Date(report.finalizedAt).toLocaleString()}`, 50, doc.y);
    }

    // Add a subtle watermark for DRAFT
    if (report.status === 'DRAFT') {
      doc
        .fontSize(60)
        .font('Helvetica-Bold')
        .fillColor('#ff0000')
        .opacity(0.08)
        .text('DRAFT', 180, 500, { align: 'center', rotation: 45 })
        .opacity(1);
    }

    // Footer line
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

    // 6. Finalize the PDF
    doc.end();

  } catch (error) {
    console.error('PDF Generation Error:', error);
    // If headers haven't been sent, return JSON error
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Failed to generate PDF.',
        error: error.message,
      });
    }
  }
};

exports.exportCSV = async (req, res) => {
  try {
    const { monthYear } = req.query;
    const reports = await prisma.monthlyReport.findMany({
      where: { monthYear },
      include: { fellowship: true },
      orderBy: { fellowship: { name: 'asc' } },
    });

    let csv = 'Fellowship,Month,Week1,Week2,Week3,Week4,Week5,Status\n';
    reports.forEach(r => {
      csv += `${r.fellowship.name},${r.monthYear},${r.week1Count},${r.week2Count},${r.week3Count},${r.week4Count},${r.week5Count},${r.status}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=reports_${monthYear}.csv`);
    res.send(csv);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};