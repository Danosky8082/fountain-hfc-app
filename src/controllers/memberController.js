const prisma = require('../prisma');

/**
 * Create a new member.
 * - ADMIN: can add to any fellowship.
 * - FL / ASSOCIATE: can only add to their own fellowship.
 * - Optional field: memberNumber (custom ID).
 */
exports.createMember = async (req, res) => {
  try {
    const { fullName, phone, email, fellowshipId, memberNumber } = req.body;
    const user = req.user; // from JWT

    // 1. Validate permissions
    if (user.role === 'ADMIN') {
      // ADMIN can add to any fellowship – allowed
    } else if (user.role === 'FL' || user.role === 'ASSOCIATE') {
      // Fetch the user's fellowship (leading or assisting)
      const userRecord = await prisma.user.findUnique({
        where: { id: user.userId },
        select: { leadingId: true, assistingId: true },
      });
      const allowedFellowshipId = userRecord.leadingId || userRecord.assistingId;
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

    // 2. Generate a unique QR code ID (if not provided, auto-generate)
    let qrUniqueId = `MEMBER-${Date.now()}`;
    // If memberNumber is provided, we can use it as qrUniqueId (or keep it separate)
    // We'll keep qrUniqueId separate and use memberNumber as a reference.
    // But if you want the QR to contain the memberNumber, you can update later.

    // 3. Create the member
    const member = await prisma.member.create({
      data: {
        fullName,
        phone: phone || null,
        email: email || null,
        fellowshipId,
        qrUniqueId,
        memberNumber: memberNumber || null, // optional custom ID
      },
    });

    res.status(201).json({
      success: true,
      data: member,
      message: 'Member added successfully.',
    });
  } catch (error) {
    console.error('Create member error:', error);
    // Handle unique constraint errors (e.g., duplicate memberNumber)
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'The member number or QR ID is already taken.',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create member.',
    });
  }
};