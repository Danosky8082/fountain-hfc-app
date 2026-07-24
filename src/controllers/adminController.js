const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const { refreshReportCounts } = require('../utils/reportUtils'); // optional, if exists

// ─── Users ───────────────────────────────────────────────────────────────

exports.getUsersByRole = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: { in: ['FL', 'ASSOCIATE'] },
      },
      select: {
        id: true,
        fullName: true,
        churchId: true,
        role: true,
      },
      orderBy: { fullName: 'asc' },
    });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { churchId, email, fullName, password, role } = req.body;
    if (!churchId || !email || !fullName || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.upsert({
      where: { churchId },
      update: {
        email,
        fullName,
        passwordHash: hashedPassword,
        role,
      },
      create: {
        churchId,
        email,
        fullName,
        passwordHash: hashedPassword,
        role,
      },
    });
    res.status(201).json({
      success: true,
      message: `User ${user.churchId} saved.`,
      data: { id: user.id, churchId: user.churchId, role: user.role },
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    if (!role || !['FL', 'ASSOCIATE', 'HOD', 'ADMIN'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role.' });
    }
    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, churchId: true, fullName: true, role: true },
    });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Fellowships ───────────────────────────────────────────────────────

exports.createFellowship = async (req, res) => {
  try {
    const { name, location, leaderId, associateId } = req.body;
    if (!name || !location) {
      return res.status(400).json({ success: false, message: 'Name and location are required.' });
    }
    // Check if leaderId already used
    if (leaderId) {
      const existing = await prisma.fellowship.findFirst({ where: { leaderId } });
      if (existing) {
        return res.status(400).json({ success: false, message: 'This user is already a leader.' });
      }
    }
    const fellowship = await prisma.fellowship.create({
      data: { name, location, leaderId, associateId },
    });
    res.status(201).json({ success: true, data: fellowship });
  } catch (error) {
    console.error('Create fellowship error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllFellowships = async (req, res) => {
  try {
    const fellowships = await prisma.fellowship.findMany({
      include: {
        leader: true,
        associate: true,
        _count: { select: { members: true } },
      },
      orderBy: { name: 'asc' },
    });
    res.status(200).json({ success: true, data: fellowships });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateFellowship = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, leaderId, associateId } = req.body;
    if (!name || !location) {
      return res.status(400).json({ success: false, message: 'Name and location are required.' });
    }
    const updated = await prisma.fellowship.update({
      where: { id },
      data: { name, location, leaderId, associateId },
      include: { leader: true, associate: true },
    });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Update fellowship error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteFellowship = async (req, res) => {
  try {
    const { id } = req.params;
    // Cascade delete
    await prisma.monthlyReport.deleteMany({ where: { fellowshipId: id } });
    const sessions = await prisma.attendanceSession.findMany({
      where: { fellowshipId: id },
      select: { id: true },
    });
    for (const s of sessions) {
      await prisma.attendanceRecord.deleteMany({ where: { sessionId: s.id } });
    }
    await prisma.attendanceSession.deleteMany({ where: { fellowshipId: id } });
    await prisma.member.deleteMany({ where: { fellowshipId: id } });
    await prisma.fellowship.delete({ where: { id } });
    res.status(200).json({ success: true, message: 'Fellowship deleted.' });
  } catch (error) {
    console.error('Delete fellowship error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Members ──────────────────────────────────────────────────────────

exports.createMember = async (req, res) => {
  try {
    const { fullName, phone, email, fellowshipId, memberNumber } = req.body;
    if (!fullName || !fellowshipId) {
      return res.status(400).json({ success: false, message: 'Full name and fellowship are required.' });
    }
    const qrUniqueId = `MEMBER-${Date.now()}`;
    const member = await prisma.member.create({
      data: {
        fullName,
        phone: phone || null,
        email: email || null,
        fellowshipId,
        qrUniqueId,
        memberNumber: memberNumber || null,
      },
    });
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, message: 'Member number or QR ID already taken.' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      where: { isActive: true },
      include: { fellowship: true },
      orderBy: { fullName: 'asc' },
    });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, phone, email, memberNumber, fellowshipId } = req.body;
    if (!fullName || !fellowshipId) {
      return res.status(400).json({ success: false, message: 'Full name and fellowship are required.' });
    }
    const updated = await prisma.member.update({
      where: { id },
      data: {
        fullName,
        phone: phone || null,
        email: email || null,
        memberNumber: memberNumber || null,
        fellowshipId,
      },
    });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Update member error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    // Soft delete
    await prisma.member.update({
      where: { id },
      data: { isActive: false },
    });
    res.status(200).json({ success: true, message: 'Member deactivated.' });
  } catch (error) {
    console.error('Delete member error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Attendance Correction ──────────────────────────────────────────

exports.correctAttendance = async (req, res) => {
  try {
    const { fellowshipId, weekNumber, monthYear, memberId, checkInMethod } = req.body;
    if (!fellowshipId || !weekNumber || !monthYear || !memberId || !checkInMethod) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }
    // Find or create session
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
          meetingDate: new Date(),
          isSubmitted: false,
        },
      });
    }
    // Upsert record
    const record = await prisma.attendanceRecord.upsert({
      where: {
        sessionId_memberId: {
          sessionId: session.id,
          memberId,
        },
      },
      update: {
        checkInMethod,
        checkedInBy: req.user.userId,
        checkedInAt: new Date(),
      },
      create: {
        sessionId: session.id,
        memberId,
        checkInMethod,
        checkedInBy: req.user.userId,
      },
    });
    // Refresh report counts (if helper exists)
    if (typeof refreshReportCounts === 'function') {
      await refreshReportCounts(fellowshipId, monthYear);
    }
    res.status(200).json({ success: true, message: 'Attendance corrected.', data: record });
  } catch (error) {
    console.error('Correct attendance error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};