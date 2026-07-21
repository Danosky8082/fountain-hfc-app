// src/controllers/attendanceController.js
const prisma = require('../prisma');

/**
 * GET /api/attendance/current-session
 * Gets the current week's session for the FL's fellowship.
 * If it doesn't exist, it creates it automatically.
 */
exports.getOrCreateCurrentSession = async (req, res) => {
  try {
    const { fellowshipId, userId } = req.user;
    const now = new Date();
    const monthYear = now.toISOString().slice(0, 7); // "2026-07"

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
 */
exports.submitWeek = async (req, res) => {
  try {
    const { fellowshipId, userId } = req.user;
    const now = new Date();
    const monthYear = now.toISOString().slice(0, 7);
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstSunday = firstDayOfMonth.getDate() + (7 - firstDayOfMonth.getDay()) % 7;
    const currentWeek = Math.min(Math.max(Math.ceil((now.getDate() - firstSunday + 1) / 7), 1), 5);

    // 🔥 VALIDATION: Check if ALL previous weeks (1 to currentWeek-1) are submitted
    for (let week = 1; week < currentWeek; week++) {
      const prevSession = await prisma.attendanceSession.findUnique({
        where: {
          fellowshipId_weekNumber_monthYear: {
            fellowshipId,
            weekNumber: week,
            monthYear,
          },
        },
      });

      // If a previous week doesn't exist OR exists but not submitted → block
      if (!prevSession || !prevSession.isSubmitted) {
        return res.status(400).json({
          success: false,
          message: `⚠️ You must submit Week ${week} before submitting Week ${currentWeek}. Please complete it first.`,
        });
      }
    }

    // Get current session
    const session = await prisma.attendanceSession.findUnique({
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
      return res.status(404).json({
        success: false,
        message: 'No attendance session found for this week. Please scan at least one member.',
      });
    }

    if (session.isSubmitted) {
      return res.status(400).json({
        success: false,
        message: 'This week has already been submitted.',
      });
    }

    // Require at least 1 person checked in (optional, but good practice)
    if (session.records.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot submit an empty week. Please mark attendance first.',
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