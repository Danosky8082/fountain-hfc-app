const prisma = require('../prisma');
const bcrypt = require('bcryptjs');

// ---- Create Fellowship ----
exports.createFellowship = async (req, res) => {
  try {
    const { name, location, leaderId, associateId } = req.body;
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
    res.status(500).json({ success: false, message: error.message });
  }
};

// ---- Create Member ----
exports.createMember = async (req, res) => {
  try {
    const { fullName, phone, email, fellowshipId } = req.body;
    const qrUniqueId = `MEMBER-${Date.now()}`;
    const member = await prisma.member.create({
      data: { fullName, phone, email, fellowshipId, qrUniqueId },
    });
    res.status(201).json({ success: true, data: member });
  } catch (error) {
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
    res.status(201).json({ success: true, data: { id: user.id, churchId: user.churchId, role: user.role } });
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

// ---- (Optional) Get all members ----
exports.getAllMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      include: { fellowship: true },
      orderBy: { fullName: 'asc' },
    });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};