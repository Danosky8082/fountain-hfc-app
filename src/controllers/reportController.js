const prisma = require('../prisma');
const PDFDocument = require('pdfkit');

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

  // ─── Build PDF content ──────────────────────────────────────
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

// ─── Get Current Report ────────────────────────────────────────
exports.getCurrentReport = async (req, res) => {
  try {
    const { fellowshipId } = req.user;
    const now = new Date();
    const monthYear = now.toISOString().slice(0, 7);

    let report = await prisma.monthlyReport.findUnique({
      where: {
        fellowshipId_monthYear: {
          fellowshipId,
          monthYear,
        },
      },
    });

    if (!report) {
      const sessions = await prisma.attendanceSession.findMany({
        where: {
          fellowshipId,
          monthYear,
          isSubmitted: true,
        },
        include: { records: true },
        orderBy: { weekNumber: 'asc' },
      });

      const weekCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      const weekDates = { 1: null, 2: null, 3: null, 4: null, 5: null };
      sessions.forEach((s) => {
        weekCounts[s.weekNumber] = s.records.length;
        weekDates[s.weekNumber] = s.meetingDate;
      });

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

    res.status(200).json({ success: true, data: fullReport });
  } catch (error) {
    console.error('Get Report Error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate report.' });
  }
};

// ─── Update Report ─────────────────────────────────────────────
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

    console.log('📝 updateReport:', { id, action });

    // 1. Fetch existing report
    const existing = await prisma.monthlyReport.findUnique({
      where: { id },
      include: { fellowship: true },
    });

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Report not found.' });
    }

    // 2. Get user with relations
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { leading: true, assisting: true },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const userFellowshipId = user.leading?.id || user.assisting?.id;
    const isAuthorized =
      userFellowshipId === existing.fellowshipId ||
      user.role === 'HOD' ||
      user.role === 'ADMIN';

    // ─── Handle RESET_TO_DRAFT ──────────────────────────────────
    if (action === 'RESET_TO_DRAFT') {
      const isAdminOrHod = user.role === 'ADMIN' || user.role === 'HOD';
      const isOwner = userFellowshipId === existing.fellowshipId;
      if (!isAdminOrHod && !isOwner) {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to reset this report.',
        });
      }

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

    // ─── For SAVE / FINALIZE ─────────────────────────────────────
    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to edit this report.',
      });
    }

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

    if (action === 'FINALIZE') {
      updateData.status = 'FINALIZED';
      updateData.finalizedAt = new Date();
      updateData.finalizedBy = userId;
    }

    // 4. Update the report
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

    // ─── Send emails if finalized ────────────────────────────────
    if (action === 'FINALIZE') {
      console.log('📧 Starting email sending process...');
      try {
        // 1. Generate PDF
        console.log('🔍 Generating PDF buffer...');
        const pdfBuffer = await generatePDFBuffer(id);
        console.log(`✅ PDF buffer size: ${pdfBuffer.length} bytes`);

        // 2. Load email service
        console.log('🔍 Loading email service...');
        const { sendReportEmail } = require('../services/emailService');
        console.log('✅ Email service loaded');

        // 3. Get HODs
        console.log('🔍 Fetching HODs...');
        const hods = await prisma.user.findMany({
          where: { role: 'HOD' },
          select: { email: true, fullName: true },
        });
        console.log(`✅ Found ${hods.length} HOD(s)`);

        // 4. Send to each HOD
        if (hods.length > 0) {
          for (const hod of hods) {
            if (hod.email) {
              console.log(`📤 Sending email to ${hod.email}...`);
              const result = await sendReportEmail({
                to: hod.email,
                subject: `📊 Monthly Report - ${updated.fellowship.name} (${updated.monthYear})`,
                html: `
                  <h2>Monthly Report Finalized</h2>
                  <p><strong>Fellowship:</strong> ${updated.fellowship.name}</p>
                  <p><strong>Month:</strong> ${updated.monthYear}</p>
                  <p><strong>Status:</strong> ${updated.status}</p>
                  <p>Please find the full PDF attached.</p>
                  <hr />
                  <p><em>This email was sent automatically by the Fountain HFC system.</em></p>
                `,
                pdfBuffer,
                filename: `HFC_Report_${updated.fellowship.name}_${updated.monthYear}.pdf`,
              });
              if (result.success) {
                console.log(`✅ Email sent to ${hod.email}`);
              } else {
                console.error(`❌ Failed to send to ${hod.email}: ${result.error}`);
              }
            }
          }
        } else {
          console.warn('⚠️ No HODs found – skipping HOD emails.');
        }

        // 5. Send confirmation to the submitter
        console.log('🔍 Fetching submitter...');
        const submitter = await prisma.user.findUnique({
          where: { id: userId },
          select: { email: true },
        });
        if (submitter?.email) {
          console.log(`📤 Sending confirmation to ${submitter.email}...`);
          const result = await sendReportEmail({
            to: submitter.email,
            subject: `✅ Report Finalized - ${updated.fellowship.name} (${updated.monthYear})`,
            html: `
              <h2>Your Report Has Been Finalized</h2>
              <p><strong>Fellowship:</strong> ${updated.fellowship.name}</p>
              <p><strong>Month:</strong> ${updated.monthYear}</p>
              <p>Thank you for submitting your report. The HODs have been notified.</p>
              <p>Attached is a copy of your final report for your records.</p>
              <hr />
              <p><em>This email was sent automatically by the Fountain HFC system.</em></p>
            `,
            pdfBuffer,
            filename: `HFC_Report_${updated.fellowship.name}_${updated.monthYear}.pdf`,
          });
          if (result.success) {
            console.log(`✅ Confirmation sent to ${submitter.email}`);
          } else {
            console.error(`❌ Failed to send confirmation: ${result.error}`);
          }
        } else {
          console.warn('⚠️ Submitter has no email – skipping confirmation.');
        }
      } catch (emailError) {
        console.error('❌ Email/PDF process error:');
        console.error(emailError);
        console.error(emailError.stack);
        // Do NOT rethrow – the report is already finalized
      }
    }

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
      error: error.message,
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
    });
  }
};

// ─── Generate PDF (for download) ──────────────────────────────
exports.generatePDF = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { leading: true, assisting: true },
    });

    const userFellowshipId = user?.leading?.id || user?.assisting?.id;
    const isAuthorized =
      userFellowshipId === report.fellowshipId ||
      user?.role === 'HOD' ||
      user?.role === 'ADMIN';

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this report.',
      });
    }

    const filename = `HFC_Report_${report.fellowship.name}_${report.monthYear}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    doc.pipe(res);

    // (PDF building code – same as generatePDFBuffer, but piped to response)
    // ─── Reuse the same PDF building logic ──────────────────────
    const formatDate = (date) => {
      if (!date) return '—';
      try { return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); } catch { return '—'; }
    };
    const fellowshipName = report.fellowship?.name || 'Unknown';
    const leaderName = report.fellowship?.leader?.fullName || '—';
    const leaderEmail = report.fellowship?.leader?.email || '—';
    const associateName = report.fellowship?.associate?.fullName || '—';
    const associateEmail = report.fellowship?.associate?.email || '—';

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
  } catch (error) {
    console.error('PDF Generation Error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Failed to generate PDF.',
        error: error.message,
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
    });
  }
};