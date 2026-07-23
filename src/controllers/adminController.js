const prisma = require('../prisma');
const bcrypt = require('bcryptjs');

// ---- Create Fellowship ----
exports.createFellowship = async (req, res) => {
  try {
    const { name, location, leaderId, associateId } = req.body;

    if (leaderId) {
      const existingLeader = await prisma.fellowship.findFirst({
        where: { leaderId: leaderId },
      });
      if (existingLeader) {
        return res.status(400).json({
          success: false,
          message: 'This user is already the leader of another fellowship.',
        });
      }
    }
    if (associateId) {
      const existingAssociate = await prisma.fellowship.findFirst({
        where: { associateId: associateId },
      });
      if (existingAssociate) {
        return res.status(400).json({
          success: false,
          message: 'This user is already the associate leader of another fellowship.',
        });
      }
    }

    const fellowship = await prisma.fellowship.create({
      data: {
        name,
        location,
        leaderId: leaderId || null,
        associateId: associateId || null,
      },
    });

    res.status(201).json({ success: true, data: fellowship });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'This user is already assigned as leader or associate of another fellowship.',
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---- Create Member ----
exports.createMember = async (req, res) => {
  try {
    const { fullName, phone, email, fellowshipId, memberNumber } = req.body;
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
      return res.status(400).json({
        success: false,
        message: 'The member number or QR ID is already taken.',
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---- Create System User ----
exports.createUser = async (req, res) => {
  try {
    const { churchId, email, fullName, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        churchId,
        email,
        fullName,
        passwordHash: hashedPassword,
        role,
      },
    });
    res.status(201).json({
      success: true,
      data: { id: user.id, churchId: user.churchId, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---- Get Users by Role (for dropdowns) ----
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

// ─── Get all members (only active) ────────────────────────────
exports.getAllMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      where: { isActive: true }, // Only active members
      include: { fellowship: true },
      orderBy: { fullName: 'asc' },
    });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Update Member ──────────────────────────────────────────────
exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, phone, email, memberNumber, fellowshipId } = req.body;

    // Check if member exists
    const existing = await prisma.member.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Member not found.' });
    }

    // Update
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

// ─── Delete Member (soft delete) ──────────────────────────────
exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.member.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Member not found.' });
    }

    // Soft delete: set isActive to false
    const updated = await prisma.member.update({
      where: { id },
      data: { isActive: false },
    });

    res.status(200).json({
      success: true,
      message: 'Member deactivated successfully.',
      data: updated,
    });
  } catch (error) {
    console.error('Delete member error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};