// src/controllers/attendanceController.js
const prisma = require('../prisma');

// ─── Helper: Refresh report counts ──────────────────────────────
const refreshReportCounts = async (fellowshipId, monthYear) => {
  try {
    // Get all submitted sessions for this fellowship and month
    const sessions = await prisma.attendanceSession.findMany({
      where: {
        fellowshipId,
        monthYear,
        isSubmitted: true,
      },
      include: {
        records: true,
      },
      orderBy: { weekNumber: 'asc' },
    });

    // Prepare week data
    const weekCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const weekDates = { 1: null, 2: null, 3: null, 4: null, 5: null };
    
    sessions.forEach((s) => {
      if (s.weekNumber >= 1 && s.weekNumber <= 5) {
        weekCounts[s.weekNumber] = s.records.length;
        weekDates[s.weekNumber] = s.meetingDate;
      }
    });

    // Find or create monthly report
    let report = await prisma.monthlyReport.findUnique({
      where: {
        fellowshipId_monthYear: {
          fellowshipId,
          monthYear,
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
      });
    } else {
      // Create new report
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

    console.log(`✅ Report refreshed for ${fellowshipId} - ${monthYear}`);
    return report;
  } catch (error) {
    console.error('Error refreshing report counts:', error);
    throw error;
  }
};

// ─── Helpers ──────────────────────────────────────────────────────
const getCurrentWeek = (date) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstSunday = firstDayOfMonth.getDate() + (7 - firstDayOfMonth.getDay()) % 7;
  let week = Math.ceil((date.getDate() - firstSunday + 1) / 7);
  return Math.min(Math.max(week, 1), 5);
};

const createSubmittedSession = async (fellowshipId, weekNumber, monthYear, meetingDate) => {
  return prisma.attendanceSession.create({
    data: {
      fellowshipId,
      weekNumber,
      monthYear,
      meetingDate: meetingDate || new Date(),
      isSubmitted: true,
      submittedAt: new Date(),
      submittedBy: null,
    },
  });
};

// ─── Get or Create Current Session ──────────────────────────────
exports.getOrCreateCurrentSession = async (req, res) => {
  try {
    const { fellowshipId: userFellowshipId, userId, role } = req.user;
    let targetFellowshipId = userFellowshipId;

    if ((role === 'ADMIN' || role === 'HOD') && req.query.fellowshipId) {
      targetFellowshipId = req.query.fellowshipId;
    }

    if (!targetFellowshipId) {
      return res.status(400).json({
        success: false,
        message: 'No fellowship selected. Please choose a fellowship.',
      });
    }

    if (role !== 'ADMIN' && role !== 'HOD') {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { leading: { select: { id: true } }, assisting: { select: { id: true } } },
      });
      const allowedFellowshipIds = [user?.leading?.id, user?.assisting?.id].filter(Boolean);
      if (!allowedFellowshipIds.includes(targetFellowshipId)) {
        return res.status(403).json({
          success: false,
          message: 'You are not authorized to view attendance for this fellowship.',
        });
      }
    }

    const now = new Date();
    const monthYear = now.toISOString().slice(0, 7);
    const currentWeek = getCurrentWeek(now);

    let session = await prisma.attendanceSession.findUnique({
      where: {
        fellowshipId_weekNumber_monthYear: {
          fellowshipId: targetFellowshipId,
          weekNumber: currentWeek,
          monthYear,
        },
      },
      include: {
        records: {
          include: { member: true },
        },
      },
    });

    if (!session) {
      session = await prisma.attendanceSession.create({
        data: {
          fellowshipId: targetFellowshipId,
          weekNumber: currentWeek,
          monthYear,
          meetingDate: now,
        },
        include: {
          records: {
            include: { member: true },
          },
        },
      });
    }

    const allMembers = await prisma.member.findMany({
      where: { fellowshipId: targetFellowshipId, isActive: true },
      orderBy: { fullName: 'asc' },
    });

    const memberStatus = allMembers.map((member) => {
      const record = session.records.find((r) => r.memberId === member.id);
      return {
        ...member,
        isPresent: !!record,
        checkInMethod: record?.checkInMethod || null,
        checkedInAt: record?.checkedInAt || null,
      };
    });

    res.status(200).json({
      success: true,
      data: {
        session: {
          id: session.id,
          weekNumber: session.weekNumber,
          meetingDate: session.meetingDate,
          isSubmitted: session.isSubmitted,
        },
        members: memberStatus,
        totalPresent: session.records.length,
      },
    });
  } catch (error) {
    console.error('Get Session Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get current attendance session.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ─── Mark Attendance ─────────────────────────────────────────────
exports.markAttendance = async (req, res) => {
  try {
    console.log('📝 Mark attendance request received');
    console.log('📦 Request body:', req.body);
    console.log('👤 User:', req.user);

    const { fellowshipId: userFellowshipId, userId, role } = req.user;
    const { memberId, checkInMethod = 'MANUAL' } = req.body;

    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: 'Member ID is required.',
      });
    }

    const validMethods = ['QR_SCAN', 'MANUAL', 'VIRTUAL', 'PIN_CHECKIN'];
    if (!validMethods.includes(checkInMethod)) {
      return res.status(400).json({
        success: false,
        message: `Invalid check-in method. Use one of: ${validMethods.join(', ')}`,
      });
    }

    let targetFellowshipId = userFellowshipId;
    if ((role === 'ADMIN' || role === 'HOD') && req.body.fellowshipId) {
      targetFellowshipId = req.body.fellowshipId;
    }

    if (!targetFellowshipId) {
      return res.status(400).json({
        success: false,
        message: 'No fellowship selected. Please choose a fellowship.',
      });
    }

    const now = new Date();
    const monthYear = now.toISOString().slice(0, 7);
    const currentWeek = getCurrentWeek(now);

    let session = await prisma.attendanceSession.findUnique({
      where: {
        fellowshipId_weekNumber_monthYear: {
          fellowshipId: targetFellowshipId,
          weekNumber: currentWeek,
          monthYear,
        },
      },
    });

    if (!session) {
      session = await prisma.attendanceSession.create({
        data: {
          fellowshipId: targetFellowshipId,
          weekNumber: currentWeek,
          monthYear,
          meetingDate: now,
        },
      });
    }

    if (session.isSubmitted) {
      return res.status(400).json({
        success: false,
        message: 'This week has already been submitted. Cannot modify attendance.',
      });
    }

    const member = await prisma.member.findFirst({
      where: {
        id: memberId,
        fellowshipId: targetFellowshipId,
        isActive: true,
      },
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found or not active in your fellowship.',
      });
    }

    const record = await prisma.attendanceRecord.upsert({
      where: {
        sessionId_memberId: {
          sessionId: session.id,
          memberId,
        },
      },
      update: {
        checkInMethod,
        checkedInBy: userId,
        checkedInAt: new Date(),
      },
      create: {
        sessionId: session.id,
        memberId,
        checkInMethod,
        checkedInBy: userId,
      },
    });

    const count = await prisma.attendanceRecord.count({
      where: { sessionId: session.id },
    });

    res.status(200).json({
      success: true,
      message: '✅ Member checked in successfully!',
      data: {
        record,
        totalPresent: count,
        member: {
          id: member.id,
          fullName: member.fullName,
        },
      },
    });
  } catch (error) {
    console.error('❌ Mark Attendance Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark attendance.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ─── Submit Week ──────────────────────────────────────────────────
exports.submitWeek = async (req, res) => {
  try {
    const { fellowshipId: userFellowshipId, userId, role } = req.user;
    const force = req.body.force === true;
    const now = new Date();
    const monthYear = now.toISOString().slice(0, 7);
    const currentWeek = getCurrentWeek(now);

    let targetFellowshipId = userFellowshipId;
    if ((role === 'ADMIN' || role === 'HOD') && req.body.fellowshipId) {
      targetFellowshipId = req.body.fellowshipId;
    }

    if (!targetFellowshipId) {
      return res.status(400).json({
        success: false,
        message: 'No fellowship selected. Please choose a fellowship.',
      });
    }

    // Get or create current session
    let session = await prisma.attendanceSession.findUnique({
      where: {
        fellowshipId_weekNumber_monthYear: {
          fellowshipId: targetFellowshipId,
          weekNumber: currentWeek,
          monthYear,
        },
      },
      include: { records: true },
    });

    if (!session) {
      session = await prisma.attendanceSession.create({
        data: {
          fellowshipId: targetFellowshipId,
          weekNumber: currentWeek,
          monthYear,
          meetingDate: now,
        },
        include: { records: true },
      });
    }

    if (session.isSubmitted) {
      return res.status(400).json({
        success: false,
        message: `Week ${currentWeek} has already been submitted.`,
      });
    }

    // Check missing previous weeks
    const missingWeeks = [];
    for (let week = 1; week < currentWeek; week++) {
      const existing = await prisma.attendanceSession.findUnique({
        where: {
          fellowshipId_weekNumber_monthYear: {
            fellowshipId: targetFellowshipId,
            weekNumber: week,
            monthYear,
          },
        },
      });
      if (!existing || !existing.isSubmitted) {
        missingWeeks.push(week);
      }
    }

    if (missingWeeks.length > 0 && !force) {
      return res.status(400).json({
        success: false,
        message: `You are missing submissions for Week(s) ${missingWeeks.join(', ')}. Please review them or force submit.`,
        missingWeeks,
        canForce: true,
      });
    }

    if (force && missingWeeks.length > 0) {
      for (const week of missingWeeks) {
        const meetingDate = new Date(now);
        meetingDate.setDate(now.getDate() - (currentWeek - week) * 7);
        await createSubmittedSession(targetFellowshipId, week, monthYear, meetingDate);
        console.log(`✅ Auto-created Week ${week} (zero attendance)`);
      }
    }

    // ─── Submit the week ───
    const submitted = await prisma.attendanceSession.update({
      where: { id: session.id },
      data: {
        isSubmitted: true,
        submittedAt: new Date(),
        submittedBy: userId,
      },
    });

    // ─── FIX: Refresh report counts after submission ───
    await refreshReportCounts(targetFellowshipId, monthYear);
    console.log(`✅ Report counts refreshed for ${targetFellowshipId} - ${monthYear}`);

    // ─── Check if this is the last week of the month ───
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const lastWeek = Math.ceil((lastDay.getDate() + (7 - new Date(now.getFullYear(), now.getMonth(), 1).getDay())) / 7);
    const isLastWeek = currentWeek >= Math.min(lastWeek, 5);

    res.status(200).json({
      success: true,
      message: `✅ Week ${currentWeek} submitted successfully!`,
      data: {
        weekNumber: currentWeek,
        totalPresent: session.records.length,
        submittedAt: submitted.submittedAt,
        missingWeeks: missingWeeks,
        isLastWeek: isLastWeek,
        monthYear: monthYear,
      },
    });
  } catch (error) {
    console.error('Submit Week Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit week. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};