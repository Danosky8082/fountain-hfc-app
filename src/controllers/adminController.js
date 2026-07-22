const prisma = require('../prisma');

exports.createFellowship = async (req, res) => {
  try {
    const { name, location, leaderId, associateId } = req.body;
    const fellowship = await prisma.fellowship.create({
      data: { name, location, leaderId, associateId },
    });
    res.status(201).json({ success: true, data: fellowship });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

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

exports.getAllMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      include: {
        fellowship: true,
      },
      orderBy: { fullName: 'asc' },
    });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};