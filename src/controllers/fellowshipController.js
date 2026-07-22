const prisma = require('../prisma');

exports.getMembers = async (req, res) => {
  try {
    const { fellowshipId, userId, role } = req.user;

    // Fetch the user with their fellowship relations
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        leading: { select: { id: true } },
        assisting: { select: { id: true } },
        role: true,
      },
    });

    const isAuthorized =
      user?.leading?.id === fellowshipId ||
      user?.assisting?.id === fellowshipId ||
      role === 'HOD' ||
      role === 'ADMIN';

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view members of this fellowship.',
      });
    }

    // Now fetch members
    const members = await prisma.member.findMany({
      where: {
        fellowshipId: fellowshipId,
        isActive: true,
      },
      orderBy: { fullName: 'asc' },
      select: {
        id: true,
        fullName: true,
        phone: true,
        email: true,
        qrUniqueId: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    console.error('Get Members Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fellowship members. Please try again later.',
    });
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