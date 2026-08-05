// src/controllers/attendanceController.js
const prisma = require('../prisma');

// ─── Helper: Get the Sunday of the current week ──────────────────
const getCurrentSunday = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const diff = now.getDate() - day;
  const sunday = new Date(now);
  sunday.setDate(diff);
  sunday.setHours(0, 0, 0, 0);
  sunday.setMinutes(0, 0, 0);
  sunday.setSeconds(0, 0);
  return sunday;
};

// ─── Helper: Get week number based on Sunday date ────────────────
const getWeekNumber = (date) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstSunday = new Date(firstDayOfMonth);
  const dayOfWeek = firstDayOfMonth.getDay();
  firstSunday.setDate(firstDayOfMonth.getDate() + (7 - dayOfWeek) % 7);
  
  const diffTime = Math.abs(date.getTime() - firstSunday.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let week = Math.floor(diffDays / 7) + 1;
  
  return Math.min(Math.max(week, 1), 5);
};

// ─── Helper: Get current week info ──────────────────────────────
const getCurrentWeekInfo = () => {
  const sunday = getCurrentSunday();
  const weekNumber = getWeekNumber(sunday);
  const monthYear = sunday.toISOString().slice(0, 7);
  
  console.log(`📅 Current week: ${weekNumber}, Sunday date: ${sunday.toISOString().split('T')[0]}`);
  
  return {
    weekNumber,
    monthYear,
    meetingDate: sunday,
    year: sunday.getFullYear(),
    month: sunday.getMonth(),
  };
};

// ─── Helper: Get Sunday for a specific week ──────────────────────
const getSundayForWeek = (year, month, weekNumber) => {
  // Find first day of month
  const firstDay = new Date(year, month, 1);
  // Find first Sunday of the month
  const firstSunday = new Date(firstDay);
  const dayOfWeek = firstDay.getDay();
  firstSunday.setDate(firstDay.getDate() + (7 - dayOfWeek) % 7);
  // Add weeks
  const targetSunday = new Date(firstSunday);
  targetSunday.setDate(firstSunday.getDate() + (weekNumber - 1) * 7);
  targetSunday.setHours(0, 0, 0, 0);
  targetSunday.setMinutes(0, 0, 0);
  targetSunday.setSeconds(0, 0);
  return targetSunday;
};

// ─── Helper: Refresh report counts ──────────────────────────────
const refreshReportCounts = async (fellowshipId, monthYear) => {
  try {
    console.log(`🔄 [REFRESH] Refreshing report for fellowship ${fellowshipId}, month ${monthYear}`);
    
    const sessions = await prisma.attendanceSession.findMany({
      where: {
        fellowshipId: fellowshipId,
        monthYear: monthYear,
        isSubmitted: true,
      },
      include: {
        records: true,
      },
      orderBy: { weekNumber: 'asc' },
    });

    console.log(`📊 [REFRESH] Found ${sessions.length} submitted sessions`);

    const weekCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const weekDates = { 1: null, 2: null, 3: null, 4: null, 5: null };
    
    sessions.forEach((s) => {
      if (s.weekNumber >= 1 && s.weekNumber <= 5) {
        weekCounts[s.weekNumber] = s.records.length;
        weekDates[s.weekNumber] = s.meetingDate;
        console.log(`📊 [REFRESH] Week ${s.weekNumber}: ${s.records.length} members present on ${s.meetingDate}`);
      }
    });

    console.log(`📊 [REFRESH] Final week counts:`, weekCounts);

    let report = await prisma.monthlyReport.findUnique({
      where: {
        fellowshipId_monthYear: {
          fellowshipId: fellowshipId,
          monthYear: monthYear,
        },
      },
    });

    if (report) {
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
      });
    }

    console.log(`✅ [REFRESH] Report refreshed successfully!`);
    return report;
  } catch (error) {
    console.error('❌ [REFRESH] Error refreshing report counts:', error);
    throw error;
  }
};

// ─── Helper: Create submitted session ────────────────────────────
const createSubmittedSession = async (fellowshipId, weekNumber, monthYear, meetingDate) => {
  return prisma.attendanceSession.create({
    data: {
      fellowshipId: fellowshipId,
      weekNumber: weekNumber,
      monthYear: monthYear,
      meetingDate: meetingDate,
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

    // ─── Get current week info (Sunday date) ───
    const weekInfo = getCurrentWeekInfo();
    const { weekNumber, monthYear, meetingDate } = weekInfo;

    console.log(`📊 [SESSION] Getting session for fellowship ${targetFellowshipId}`);
    console.log(`📅 [SESSION] Week ${weekNumber}, Month ${monthYear}, Sunday ${meetingDate.toISOString().split('T')[0]}`);

    // ─── IMPORTANT: Use the CORRECT Sunday date for ALL fellowships ───
    // Always use the calculated Sunday date, not the current date
    let session = await prisma.attendanceSession.findUnique({
      where: {
        fellowshipId_weekNumber_monthYear: {
          fellowshipId: targetFellowshipId,
          weekNumber: weekNumber,
          monthYear: monthYear,
        },
      },
      include: {
        records: {
          include: { member: true },
        },
      },
    });

    if (!session) {
      console.log(`📝 [SESSION] Creating new session for fellowship ${targetFellowshipId}`);
      console.log(`📅 [SESSION] Using meeting date: ${meetingDate.toISOString().split('T')[0]}`);
      
      session = await prisma.attendanceSession.create({
        data: {
          fellowshipId: targetFellowshipId,
          weekNumber: weekNumber,
          monthYear: monthYear,
          meetingDate: meetingDate, // ← Using the calculated Sunday date
        },
        include: {
          records: {
            include: { member: true },
          },
        },
      });
    } else {
      console.log(`✅ [SESSION] Found existing session with ${session.records.length} records`);
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
    console.log('📝 [MARK] Mark attendance request received');
    console.log('📦 [MARK] Request body:', req.body);
    console.log('👤 [MARK] User:', req.user);

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

    // ─── Get current week info (Sunday date) ───
    const weekInfo = getCurrentWeekInfo();
    const { weekNumber, monthYear, meetingDate } = weekInfo;

    console.log(`📊 [MARK] Marking attendance for fellowship ${targetFellowshipId}`);
    console.log(`📅 [MARK] Week ${weekNumber}, Sunday ${meetingDate.toISOString().split('T')[0]}`);

    let session = await prisma.attendanceSession.findUnique({
      where: {
        fellowshipId_weekNumber_monthYear: {
          fellowshipId: targetFellowshipId,
          weekNumber: weekNumber,
          monthYear: monthYear,
        },
      },
    });

    if (!session) {
      console.log(`📝 [MARK] Creating new session for week ${weekNumber}`);
      session = await prisma.attendanceSession.create({
        data: {
          fellowshipId: targetFellowshipId,
          weekNumber: weekNumber,
          monthYear: monthYear,
          meetingDate: meetingDate,
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
          memberId: memberId,
        },
      },
      update: {
        checkInMethod: checkInMethod,
        checkedInBy: userId,
        checkedInAt: new Date(),
      },
      create: {
        sessionId: session.id,
        memberId: memberId,
        checkInMethod: checkInMethod,
        checkedInBy: userId,
      },
    });

    const count = await prisma.attendanceRecord.count({
      where: { sessionId: session.id },
    });

    console.log(`✅ [MARK] Member ${member.fullName} checked in. Total: ${count}`);

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
    console.error('❌ [MARK] Mark Attendance Error:', error);
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
    
    // ─── Get current week info (Sunday date) ───
    const weekInfo = getCurrentWeekInfo();
    const { weekNumber, monthYear, meetingDate } = weekInfo;

    console.log(`📝 [SUBMIT] Submitting week ${weekNumber} for month ${monthYear}`);
    console.log(`📅 [SUBMIT] Sunday date: ${meetingDate.toISOString().split('T')[0]}`);
    console.log(`👤 [SUBMIT] User: ${userId}, Role: ${role}`);

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

    console.log(`📊 [SUBMIT] Target fellowship: ${targetFellowshipId}`);

    let session = await prisma.attendanceSession.findUnique({
      where: {
        fellowshipId_weekNumber_monthYear: {
          fellowshipId: targetFellowshipId,
          weekNumber: weekNumber,
          monthYear: monthYear,
        },
      },
      include: { records: true },
    });

    if (!session) {
      console.log(`📝 [SUBMIT] Creating new session for week ${weekNumber}`);
      session = await prisma.attendanceSession.create({
        data: {
          fellowshipId: targetFellowshipId,
          weekNumber: weekNumber,
          monthYear: monthYear,
          meetingDate: meetingDate,
        },
        include: { records: true },
      });
    }

    console.log(`📊 [SUBMIT] Session has ${session.records.length} records`);

    if (session.isSubmitted) {
      return res.status(400).json({
        success: false,
        message: `Week ${weekNumber} has already been submitted.`,
      });
    }

    // Check missing previous weeks
    const missingWeeks = [];
    for (let week = 1; week < weekNumber; week++) {
      const existing = await prisma.attendanceSession.findUnique({
        where: {
          fellowshipId_weekNumber_monthYear: {
            fellowshipId: targetFellowshipId,
            weekNumber: week,
            monthYear: monthYear,
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
      console.log(`📝 [SUBMIT] Force submitting with ${missingWeeks.length} missing weeks`);
      for (const week of missingWeeks) {
        // ─── Calculate the Sunday for the missing week ───
        const missingSunday = getSundayForWeek(meetingDate.getFullYear(), meetingDate.getMonth(), week);
        await createSubmittedSession(targetFellowshipId, week, monthYear, missingSunday);
        console.log(`✅ [SUBMIT] Auto-created Week ${week} (zero attendance) on ${missingSunday.toISOString().split('T')[0]}`);
      }
    }

    const submitted = await prisma.attendanceSession.update({
      where: { id: session.id },
      data: {
        isSubmitted: true,
        submittedAt: new Date(),
        submittedBy: userId,
      },
    });

    console.log(`✅ [SUBMIT] Week ${weekNumber} submitted with ${session.records.length} members`);

    await refreshReportCounts(targetFellowshipId, monthYear);
    console.log(`✅ [SUBMIT] Report counts refreshed`);

    const lastDay = new Date(meetingDate.getFullYear(), meetingDate.getMonth() + 1, 0);
    const lastSunday = new Date(lastDay);
    const dayOfWeek = lastDay.getDay();
    lastSunday.setDate(lastDay.getDate() - dayOfWeek);
    const lastWeekNumber = getWeekNumber(lastSunday);
    const isLastWeek = weekNumber >= Math.min(lastWeekNumber, 5);

    res.status(200).json({
      success: true,
      message: `✅ Week ${weekNumber} submitted successfully!`,
      data: {
        weekNumber: weekNumber,
        meetingDate: meetingDate,
        totalPresent: session.records.length,
        submittedAt: submitted.submittedAt,
        missingWeeks: missingWeeks,
        isLastWeek: isLastWeek,
        monthYear: monthYear,
      },
    });
  } catch (error) {
    console.error('❌ [SUBMIT] Submit Week Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit week. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};