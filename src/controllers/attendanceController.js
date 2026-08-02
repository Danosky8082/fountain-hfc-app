const prisma = require('../prisma');

// ─── Helpers ──────────────────────────────────────────────────────
const getCurrentWeek = (date) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstSunday = firstDayOfMonth.getDate() + (7 - firstDayOfMonth.getDay()) % 7;
  let week = Math.ceil((date.getDate() - firstSunday + 1) / 7);
  return Math.min(Math.max(week, 1), 5);
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

    // ─── Validate required fields ───
    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: 'Member ID is required.',
      });
    }

    // ─── Validate check-in method ───
    const validMethods = ['QR_SCAN', 'MANUAL', 'VIRTUAL', 'PIN_CHECKIN'];
    if (!validMethods.includes(checkInMethod)) {
      return res.status(400).json({
        success: false,
        message: `Invalid check-in method. Use one of: ${validMethods.join(', ')}`,
      });
    }

    // ─── Determine which fellowship to use ───
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

    // ─── Get current week ───
    const now = new Date();
    const monthYear = now.toISOString().slice(0, 7);
    const currentWeek = getCurrentWeek(now);

    // ─── Find or create session ───
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

    // ─── Check if session is already submitted ───
    if (session.isSubmitted) {
      return res.status(400).json({
        success: false,
        message: 'This week has already been submitted. Cannot modify attendance.',
      });
    }

    // ─── Verify member exists and belongs to this fellowship ───
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

    // ─── Upsert attendance record ───
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

    // ─── Get total present count ───
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

    // Submit the week
    const submitted = await prisma.attendanceSession.update({
      where: { id: session.id },
      data: {
        isSubmitted: true,
        submittedAt: new Date(),
        submittedBy: userId,
      },
    });

    res.status(200).json({
      success: true,
      message: `✅ Week ${currentWeek} submitted successfully!`,
      data: {
        weekNumber: currentWeek,
        totalPresent: session.records.length,
        submittedAt: submitted.submittedAt,
        missingWeeks: missingWeeks,
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