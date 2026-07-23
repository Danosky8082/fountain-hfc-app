const prisma = require('../prisma');

// ─── Helper: Get current week number (1‑5) ─────────────────────
const getCurrentWeek = (date) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstSunday = firstDayOfMonth.getDate() + (7 - firstDayOfMonth.getDay()) % 7;
  let week = Math.ceil((date.getDate() - firstSunday + 1) / 7);
  return Math.min(Math.max(week, 1), 5);
};

// ─── Helper: Create a submitted session for a given week ──────
const createSubmittedSession = async (fellowshipId, weekNumber, monthYear, meetingDate) => {
  return prisma.attendanceSession.create({
    data: {
      fellowshipId,
      weekNumber,
      monthYear,
      meetingDate: meetingDate || new Date(),
      isSubmitted: true,
      submittedAt: new Date(),
      submittedBy: null, // system
    },
  });
};

/**
 * GET /api/attendance/current-session
 * Gets the current week's session for the FL's fellowship.
 * If it doesn't exist, it creates it automatically.
 */
exports.getOrCreateCurrentSession = async (req, res) => {
  try {
    const { fellowshipId, userId } = req.user;
    const now = new Date();
    const monthYear = now.toISOString().slice(0, 7);

    // Calculate week number (1-5) based on which Sunday of the month it is
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstSunday = firstDayOfMonth.getDate() + (7 - firstDayOfMonth.getDay()) % 7;
    const weekNumber = Math.ceil((now.getDate() - firstSunday + 1) / 7);
    const clampedWeekNumber = Math.min(Math.max(weekNumber, 1), 5);

    // Try to find existing session for this week
    let session = await prisma.attendanceSession.findUnique({
      where: {
        fellowshipId_weekNumber_monthYear: {
          fellowshipId,
          weekNumber: clampedWeekNumber,
          monthYear,
        },
      },
      include: {
        records: {
          include: { member: true },
        },
      },
    });

    // If no session exists, create one
    if (!session) {
      session = await prisma.attendanceSession.create({
        data: {
          fellowshipId,
          weekNumber: clampedWeekNumber,
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
      where: { fellowshipId, isActive: true },
      orderBy: { fullName: 'asc' },
    });

    // Map attendance status for each member
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

/**
 * POST /api/attendance/mark
 * Marks a member as present (QR, Manual, or Virtual)
 * Body: { memberId, checkInMethod: "QR_SCAN" | "MANUAL" | "VIRTUAL" }
 */
exports.markAttendance = async (req, res) => {
  try {
    const { fellowshipId, userId } = req.user;
    const { memberId, checkInMethod = 'MANUAL' } = req.body;

    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: 'Member ID is required.',
      });
    }

    // Validate checkInMethod
    const validMethods = ['QR_SCAN', 'MANUAL', 'VIRTUAL', 'PIN_CHECKIN'];
    if (!validMethods.includes(checkInMethod)) {
      return res.status(400).json({
        success: false,
        message: `Invalid check-in method. Use one of: ${validMethods.join(', ')}`,
      });
    }

    // Get or create the current session
    const now = new Date();
    const monthYear = now.toISOString().slice(0, 7);
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstSunday = firstDayOfMonth.getDate() + (7 - firstDayOfMonth.getDay()) % 7;
    const weekNumber = Math.min(Math.max(Math.ceil((now.getDate() - firstSunday + 1) / 7), 1), 5);

    let session = await prisma.attendanceSession.findUnique({
      where: {
        fellowshipId_weekNumber_monthYear: {
          fellowshipId,
          weekNumber,
          monthYear,
        },
      },
    });

    if (!session) {
      session = await prisma.attendanceSession.create({
        data: {
          fellowshipId,
          weekNumber,
          monthYear,
          meetingDate: now,
        },
      });
    }

    // Check if session is already submitted – prevent marking if submitted
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
        fellowshipId,
        isActive: true,
      },
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found or not active in your fellowship.',
      });
    }

    // Create the attendance record (upsert to prevent duplicates)
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

    // Get updated count
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

/**
 * POST /api/attendance/submit-week
 * Submits the current week's attendance (validates no skipped weeks)
 * Optionally force‑submits, auto‑creating missing weeks with zero attendance.
 * Body: { force: true } (optional)
 */
exports.submitWeek = async (req, res) => {
  try {
    const { fellowshipId, userId } = req.user;
    const force = req.body.force === true; // optional flag
    const now = new Date();
    const monthYear = now.toISOString().slice(0, 7);
    const currentWeek = getCurrentWeek(now);

    // 1. Get or create the current session
    let session = await prisma.attendanceSession.findUnique({
      where: {
        fellowshipId_weekNumber_monthYear: {
          fellowshipId,
          weekNumber: currentWeek,
          monthYear,
        },
      },
      include: { records: true },
    });

    if (!session) {
      session = await prisma.attendanceSession.create({
        data: {
          fellowshipId,
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

    // 2. Check for missing previous weeks (1 .. currentWeek-1)
    const missingWeeks = [];
    for (let week = 1; week < currentWeek; week++) {
      const existing = await prisma.attendanceSession.findUnique({
        where: {
          fellowshipId_weekNumber_monthYear: {
            fellowshipId,
            weekNumber: week,
            monthYear,
          },
        },
      });
      if (!existing || !existing.isSubmitted) {
        missingWeeks.push(week);
      }
    }

    // 3. If there are missing weeks and `force` is not set, return the list
    if (missingWeeks.length > 0 && !force) {
      return res.status(400).json({
        success: false,
        message: `You are missing submissions for Week(s) ${missingWeeks.join(', ')}. Please review them or force submit.`,
        missingWeeks,
        canForce: true,
      });
    }

    // 4. If `force` is true, auto‑create missing weeks with zero attendance
    if (force && missingWeeks.length > 0) {
      for (const week of missingWeeks) {
        // Approximate meeting date (7 days before current week)
        const meetingDate = new Date(now);
        meetingDate.setDate(now.getDate() - (currentWeek - week) * 7);
        await createSubmittedSession(fellowshipId, week, monthYear, meetingDate);
        console.log(`✅ Auto-created Week ${week} (zero attendance)`);
      }
    }

    // 5. Submit the current week
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