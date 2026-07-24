// src/utils/reportUtils.js
const prisma = require('../prisma');

/**
 * Refresh the week counts and dates for a MonthlyReport
 * @param {string} fellowshipId
 * @param {string} monthYear - format "YYYY-MM"
 */
const refreshReportCounts = async (fellowshipId, monthYear) => {
  // 1. Find or create the report
  let report = await prisma.monthlyReport.findUnique({
    where: {
      fellowshipId_monthYear: {
        fellowshipId,
        monthYear,
      },
    },
  });

  if (!report) {
    report = await prisma.monthlyReport.create({
      data: {
        fellowshipId,
        monthYear,
        status: 'DRAFT',
        week1Count: 0,
        week2Count: 0,
        week3Count: 0,
        week4Count: 0,
        week5Count: 0,
      },
    });
  }

  // 2. Get all submitted sessions for this fellowship/month
  const sessions = await prisma.attendanceSession.findMany({
    where: {
      fellowshipId,
      monthYear,
      isSubmitted: true,
    },
    include: { records: true },
  });

  // 3. Aggregate counts and dates
  const weekCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const weekDates = { 1: null, 2: null, 3: null, 4: null, 5: null };
  sessions.forEach((s) => {
    weekCounts[s.weekNumber] = s.records.length;
    weekDates[s.weekNumber] = s.meetingDate;
  });

  // 4. Update the report
  const updated = await prisma.monthlyReport.update({
    where: { id: report.id },
    data: {
      week1Count: weekCounts[1],
      week2Count: weekCounts[2],
      week3Count: weekCounts[3],
      week4Count: weekCounts[4],
      week5Count: weekCounts[5],
      week1Date: weekDates[1],
      week2Date: weekDates[2],
      week3Date: weekDates[3],
      week4Date: weekDates[4],
      week5Date: weekDates[5],
    },
  });

  return updated;
};

module.exports = { refreshReportCounts };