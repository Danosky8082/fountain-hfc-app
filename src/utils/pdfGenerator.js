const PDFDocument = require('pdfkit');
const prisma = require('../prisma');

/**
 * Generate a PDF buffer for a given report ID
 * @param {string} reportId
 * @returns {Promise<Buffer>}
 */
exports.generatePDFBuffer = async (reportId) => {
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

  // Create a PDF document in memory (no streams)
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50,
    info: {
      Title: `HFC Report - ${report.fellowship.name} - ${report.monthYear}`,
      Author: 'Fountain of Life HFC System',
    },
  });

  // Collect PDF data into a buffer
  const chunks = [];
  doc.on('data', (chunk) => chunks.push(chunk));
  doc.on('end', () => {});

  // --- Build the PDF content (same as your existing generatePDF) ---
  const formatDate = (date) => {
    if (!date) return '—';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

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
  yPos = drawField('NAME OF HOME FELLOWSHIP', report.fellowship.name, yPos);
  yPos = drawField('NAME OF HOME FELLOWSHIP LEADER', report.fellowship.leader?.fullName || '—', yPos);
  yPos = drawField('HFL Email', report.fellowship.leader?.email || '—', yPos);
  yPos = drawField('NAME OF ASSOCIATE HOME FELLOWSHIP LEADER', report.fellowship.associate?.fullName || '—', yPos);
  yPos = drawField('Associate HFL Email', report.fellowship.associate?.email || '—', yPos);

  doc.moveDown(0.5);

  // Weekly Attendance Table
  doc
    .fontSize(12)
    .font('Helvetica-Bold')
    .fillColor('#1a1a2e')
    .text('📊 WEEKLY ATTENDANCE')
    .moveDown(0.3);

  const tableX = 50;
  let tableY = doc.y;
  const col1 = 50;
  const col2 = 220;
  const col3 = 380;
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

  // Pastoral & Follow-up
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

  // Footer
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

  // End the document
  doc.end();

  // Return a promise that resolves with the buffer
  return new Promise((resolve, reject) => {
    let buffer = Buffer.concat(chunks);
    doc.on('end', () => resolve(buffer));
    doc.on('error', reject);
  });
};