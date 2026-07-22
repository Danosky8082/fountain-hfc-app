const prisma = require('../prisma');

exports.createMember = async (req, res) => {
  try {
    const { fullName, phone, email, fellowshipId, memberNumber } = req.body;
    const user = req.user;

    // Permission checks
    if (user.role === 'ADMIN') {
      // allowed
    } else if (user.role === 'FL' || user.role === 'ASSOCIATE') {
      // ✅ Fix: use include to fetch related fellowships
      const userRecord = await prisma.user.findUnique({
        where: { id: user.userId },
        include: { leading: true, assisting: true },
      });
      const allowedFellowshipId = userRecord?.leading?.id || userRecord?.assisting?.id;
      if (!allowedFellowshipId || allowedFellowshipId !== fellowshipId) {
        return res.status(403).json({
          success: false,
          message: 'You can only add members to your own fellowship.',
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions to add members.',
      });
    }

    // Create member
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