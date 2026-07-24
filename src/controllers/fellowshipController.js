const prisma = require('../prisma');

exports.getMembers = async (req, res) => {
  try {
    const { fellowshipId, userId, role } = req.user;

    // Fetch the user with their fellowship relations
    // src/controllers/fellowshipController.js
exports.getMembers = async (req, res) => {
  try {
    const { fellowshipId: userFellowshipId, userId, role } = req.user;
    let targetFellowshipId = userFellowshipId;

    // If user is ADMIN or HOD, and a fellowshipId is provided in query, use that
    if ((role === 'ADMIN' || role === 'HOD') && req.query.fellowshipId) {
      targetFellowshipId = req.query.fellowshipId;
    }

    if (!targetFellowshipId) {
      return res.status(400).json({
        success: false,
        message: 'No fellowship selected. Please choose a fellowship.',
      });
    }

    // Verify the user has access (if not Admin/HOD, enforce their own fellowship)
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { leading: { select: { id: true } }, assisting: { select: { id: true } } },
    });
    const allowedFellowshipIds = [user?.leading?.id, user?.assisting?.id].filter(Boolean);
    if (role !== 'ADMIN' && role !== 'HOD' && !allowedFellowshipIds.includes(targetFellowshipId)) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view members of this fellowship.',
      });
    }

    const members = await prisma.member.findMany({
      where: { fellowshipId: targetFellowshipId, isActive: true },
      orderBy: { fullName: 'asc' },
      select: { id: true, fullName: true, phone: true, email: true, qrUniqueId: true, memberNumber: true },
    });

    res.status(200).json({ success: true, data: members });
  } catch (error) {
    console.error('Get Members Error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch members.' });
  }
};

exports.getFellowshipDetails = async (req, res) => {
  try {
    const { fellowshipId } = req.user;

    const fellowship = await prisma.fellowship.findUnique({
      where: { id: fellowshipId },
      select: {
        id: true,
        name: true,
        location: true,
        createdAt: true,
      },
    });

    if (!fellowship) {
      return res.status(404).json({
        success: false,
        message: 'Fellowship not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: fellowship,
    });
  } catch (error) {
    console.error('Get Fellowship Details Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fellowship details.',
    });
  }
};

exports.getAllFellowships = async (req, res) => {
  try {
    const fellowships = await prisma.fellowship.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    });
    res.status(200).json({ success: true, data: fellowships });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};