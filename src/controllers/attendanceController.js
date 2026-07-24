const prisma = require('../prisma');

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

    // If user is ADMIN or HOD, allow overriding with query param
    if ((role === 'ADMIN' || role === 'HOD') && req.query.fellowshipId) {
      targetFellowshipId = req.query.fellowshipId;
    }

    // ✅ Check if we have a valid fellowship ID
    if (!targetFellowshipId) {
      return res.status(400).json({
        success: false,
        message: 'No fellowship selected. Please choose a fellowship.',
      });
    }

    // For non-Admin/HOD, verify they have access to that fellowship
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

    // Find or create session
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

    // Get all active members of this fellowship
    const allMembers = await prisma.member.findMany({
      where: { fellowshipId: targetFellowshipId, isActive: true },
      orderBy: { fullName: 'asc' },
    });

    // Map attendance status
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
    });
  }
};

// ─── Mark Attendance ─────────────────────────────────────────────
exports.markAttendance = async (req, res) => {
  try {
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

    // Determine which fellowship to use
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

    // Verify member belongs to this fellowship
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
      message: 'Member checked in successfully.',
      data: {
        record,
        totalPresent: count,
      },
    });
  } catch (error) {
    console.error('Mark Attendance Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark attendance.',
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
      message: `✅ Week ${currentWeek} submitted successfully!` +
        (missingWeeks.length > 0 ? ` Missing weeks ${missingWeeks.join(', ')} were auto‑created with zero attendance.` : ''),
      data: {
        weekNumber: currentWeek,
        totalPresent: session.records.length,
        submittedAt: submitted.submittedAt,
        autoCreatedWeeks: missingWeeks,
      },
    });
  } catch (error) {
    console.error('Submit Week Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit week. Please try again.',
    });
  }
};