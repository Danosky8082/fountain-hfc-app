const prisma = require('../prisma');
const bcrypt = require('bcryptjs');

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
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        churchId: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { fullName: 'asc' },
    });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { churchId, email, fullName, password, role } = req.body;
    
    // Validate required fields
    if (!churchId || !email || !fullName || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { churchId }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `User with church ID ${churchId} already exists.`,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        churchId,
        email,
        fullName,
        passwordHash: hashedPassword,
        role,
      },
      select: {
        id: true,
        churchId: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,
      },
    });
    
    res.status(201).json({
      success: true,
      message: `User ${user.churchId} created successfully.`,
      data: user,
    });
  } catch (error) {
    console.error('Create user error:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'A user with this churchId or email already exists.',
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!role || !['FL', 'ASSOCIATE', 'HOD', 'ADMIN'].includes(role)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid role. Must be one of: FL, ASSOCIATE, HOD, ADMIN.' 
      });
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: { 
        id: true, 
        churchId: true, 
        fullName: true, 
        role: true,
        email: true,
      },
    });
    
    res.status(200).json({ 
      success: true, 
      message: `User role updated to ${role}.`,
      data: updatedUser 
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Fellowships ───────────────────────────────────────────────────────

exports.createFellowship = async (req, res) => {
  try {
    const { name, location, leaderId, associateId } = req.body;
    
    // Validate required fields
    if (!name || !location) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and location are required.' 
      });
    }

    // Check if fellowship name already exists
    const existingFellowship = await prisma.fellowship.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } }
    });

    if (existingFellowship) {
      return res.status(400).json({
        success: false,
        message: 'A fellowship with this name already exists.'
      });
    }

    // ─── FIX: Validate leader exists before creating ───
    if (leaderId) {
      const leader = await prisma.user.findUnique({
        where: { id: leaderId }
      });
      
      if (!leader) {
        return res.status(400).json({
          success: false,
          message: `Leader with ID ${leaderId} does not exist. Please select a valid user.`
        });
      }

      // Check if leader is already leading another fellowship
      const existingLeadership = await prisma.fellowship.findFirst({
        where: { leaderId: leaderId }
      });
      
      if (existingLeadership) {
        return res.status(400).json({
          success: false,
          message: 'This user is already leading another fellowship.'
        });
      }
    }

    // ─── FIX: Validate associate exists before creating ───
    if (associateId) {
      const associate = await prisma.user.findUnique({
        where: { id: associateId }
      });
      
      if (!associate) {
        return res.status(400).json({
          success: false,
          message: `Associate with ID ${associateId} does not exist. Please select a valid user.`
        });
      }

      // Check if associate is already assigned to another fellowship
      const existingAssociate = await prisma.fellowship.findFirst({
        where: { associateId: associateId }
      });
      
      if (existingAssociate) {
        return res.status(400).json({
          success: false,
          message: 'This user is already assigned as associate to another fellowship.'
        });
      }
    }

    // ─── Create fellowship with validated data ───
    const fellowship = await prisma.fellowship.create({
      data: {
        name: name.trim(),
        location: location.trim(),
        leaderId: leaderId || null,
        associateId: associateId || null,
      },
      include: {
        leader: {
          select: { id: true, fullName: true, email: true, role: true }
        },
        associate: {
          select: { id: true, fullName: true, email: true, role: true }
        }
      }
    });

    // ─── Update user roles if needed ───
    if (leaderId) {
      await prisma.user.update({
        where: { id: leaderId },
        data: { role: 'FL' }
      });
    }

    if (associateId) {
      await prisma.user.update({
        where: { id: associateId },
        data: { role: 'ASSOCIATE' }
      });
    }

    res.status(201).json({
      success: true,
      data: fellowship,
      message: 'Fellowship created successfully.'
    });

  } catch (error) {
    console.error('Create Fellowship Error:', error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2003') {
      return res.status(400).json({
        success: false,
        message: 'Invalid leaderId or associateId - User does not exist. Please select valid users.',
        error: error.meta?.field_name
      });
    }
    
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'This user is already assigned to another fellowship.',
        error: error.meta?.target
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create fellowship.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.getAllFellowships = async (req, res) => {
  try {
    const fellowships = await prisma.fellowship.findMany({
      include: {
        leader: {
          select: {
            id: true,
            fullName: true,
            churchId: true,
            email: true
          }
        },
        associate: {
          select: {
            id: true,
            fullName: true,
            churchId: true,
            email: true
          }
        },
        _count: { 
          select: { 
            members: true,
            sessions: true,
            reports: true
          } 
        },
      },
      orderBy: { name: 'asc' },
    });
    
    res.status(200).json({ 
      success: true, 
      data: fellowships,
      count: fellowships.length 
    });
  } catch (error) {
    console.error('Get all fellowships error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch fellowships.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.updateFellowship = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, leaderId, associateId } = req.body;
    
    // Validate required fields
    if (!name || !location) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and location are required.' 
      });
    }

    // ─── Check if fellowship exists ───
    const existingFellowship = await prisma.fellowship.findUnique({
      where: { id }
    });

    if (!existingFellowship) {
      return res.status(404).json({
        success: false,
        message: 'Fellowship not found.'
      });
    }

    // ─── FIX: Validate leader exists before updating ───
    if (leaderId) {
      const leader = await prisma.user.findUnique({
        where: { id: leaderId }
      });
      
      if (!leader) {
        return res.status(400).json({
          success: false,
          message: `Leader with ID ${leaderId} does not exist. Please select a valid user.`
        });
      }

      // Check if leader is already leading another fellowship (excluding this one)
      const existingLeadership = await prisma.fellowship.findFirst({
        where: {
          leaderId: leaderId,
          NOT: { id: id }
        }
      });
      
      if (existingLeadership) {
        return res.status(400).json({
          success: false,
          message: 'This user is already leading another fellowship.'
        });
      }
    }

    // ─── FIX: Validate associate exists before updating ───
    if (associateId) {
      const associate = await prisma.user.findUnique({
        where: { id: associateId }
      });
      
      if (!associate) {
        return res.status(400).json({
          success: false,
          message: `Associate with ID ${associateId} does not exist. Please select a valid user.`
        });
      }

      // Check if associate is already assigned to another fellowship (excluding this one)
      const existingAssociate = await prisma.fellowship.findFirst({
        where: {
          associateId: associateId,
          NOT: { id: id }
        }
      });
      
      if (existingAssociate) {
        return res.status(400).json({
          success: false,
          message: 'This user is already assigned as associate to another fellowship.'
        });
      }
    }

    // ─── Build update data ───
    const updateData = {
      name: name.trim(),
      location: location.trim(),
      leaderId: leaderId || null,
      associateId: associateId || null,
    };

    // ─── Update fellowship ───
    const fellowship = await prisma.fellowship.update({
      where: { id },
      data: updateData,
      include: {
        leader: {
          select: { id: true, fullName: true, email: true, role: true }
        },
        associate: {
          select: { id: true, fullName: true, email: true, role: true }
        },
        _count: {
          select: { members: true, sessions: true, reports: true }
        }
      }
    });

    // ─── Update user roles if needed ───
    if (leaderId) {
      await prisma.user.update({
        where: { id: leaderId },
        data: { role: 'FL' }
      });
    }

    if (associateId) {
      await prisma.user.update({
        where: { id: associateId },
        data: { role: 'ASSOCIATE' }
      });
    }

    res.status(200).json({
      success: true,
      data: fellowship,
      message: 'Fellowship updated successfully.'
    });

  } catch (error) {
    console.error('Update Fellowship Error:', error);
    
    if (error.code === 'P2003') {
      return res.status(400).json({
        success: false,
        message: 'Invalid leaderId or associateId - User does not exist. Please select valid users.',
        error: error.meta?.field_name
      });
    }
    
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: 'This user is already assigned to another fellowship.',
        error: error.meta?.target
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update fellowship.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.deleteFellowship = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ─── Check if fellowship exists and has dependencies ───
    const fellowship = await prisma.fellowship.findUnique({
      where: { id },
      include: {
        members: true,
        sessions: true,
        reports: true
      }
    });

    if (!fellowship) {
      return res.status(404).json({
        success: false,
        message: 'Fellowship not found.'
      });
    }

    // ─── Check for dependent records ───
    if (fellowship.members.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete fellowship with ${fellowship.members.length} existing members. Remove members first.`
      });
    }

    if (fellowship.sessions.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete fellowship with ${fellowship.sessions.length} existing sessions. Delete sessions first.`
      });
    }

    if (fellowship.reports.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete fellowship with ${fellowship.reports.length} existing reports. Delete reports first.`
      });
    }

    // ─── Delete the fellowship ───
    await prisma.fellowship.delete({
      where: { id }
    });

    res.status(200).json({
      success: true,
      message: 'Fellowship deleted successfully.'
    });

  } catch (error) {
    console.error('Delete Fellowship Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete fellowship.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// ─── Members ──────────────────────────────────────────────────────────

exports.createMember = async (req, res) => {
  try {
    const { fullName, phone, email, fellowshipId, memberNumber } = req.body;
    
    if (!fullName || !fellowshipId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Full name and fellowship are required.' 
      });
    }

    // ─── Check if fellowship exists ───
    const fellowship = await prisma.fellowship.findUnique({
      where: { id: fellowshipId }
    });

    if (!fellowship) {
      return res.status(400).json({
        success: false,
        message: 'Fellowship does not exist. Please select a valid fellowship.'
      });
    }

    // ─── Check if member number is unique (if provided) ───
    if (memberNumber) {
      const existingMember = await prisma.member.findFirst({
        where: { 
          memberNumber: memberNumber,
          isActive: true
        }
      });

      if (existingMember) {
        return res.status(400).json({
          success: false,
          message: 'Member number already exists. Please use a unique number.'
        });
      }
    }

    const qrUniqueId = `MEMBER-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
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
    
    res.status(201).json({ 
      success: true, 
      data: member,
      message: 'Member created successfully.'
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        success: false, 
        message: 'Member number or QR ID already taken.' 
      });
    }
    if (error.code === 'P2003') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid fellowship ID. Please select a valid fellowship.' 
      });
    }
    console.error('Create member error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      where: { isActive: true },
      include: { 
        fellowship: {
          select: {
            id: true,
            name: true,
            location: true
          }
        } 
      },
      orderBy: { fullName: 'asc' },
    });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    console.error('Get all members error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, phone, email, memberNumber, fellowshipId } = req.body;
    
    if (!fullName || !fellowshipId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Full name and fellowship are required.' 
      });
    }

    // ─── Check if member exists ───
    const existingMember = await prisma.member.findUnique({
      where: { id }
    });

    if (!existingMember) {
      return res.status(404).json({
        success: false,
        message: 'Member not found.'
      });
    }

    // ─── Check if fellowship exists ───
    const fellowship = await prisma.fellowship.findUnique({
      where: { id: fellowshipId }
    });

    if (!fellowship) {
      return res.status(400).json({
        success: false,
        message: 'Fellowship does not exist. Please select a valid fellowship.'
      });
    }

    // ─── Check if member number is unique (if provided and changed) ───
    if (memberNumber && memberNumber !== existingMember.memberNumber) {
      const duplicateMember = await prisma.member.findFirst({
        where: { 
          memberNumber: memberNumber,
          isActive: true,
          NOT: { id: id }
        }
      });

      if (duplicateMember) {
        return res.status(400).json({
          success: false,
          message: 'Member number already exists. Please use a unique number.'
        });
      }
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
    
    res.status(200).json({ 
      success: true, 
      data: updated,
      message: 'Member updated successfully.'
    });
  } catch (error) {
    console.error('Update member error:', error);
    if (error.code === 'P2003') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid fellowship ID. Please select a valid fellowship.' 
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ─── Check if member exists ───
    const member = await prisma.member.findUnique({
      where: { id }
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found.'
      });
    }

    // ─── Soft delete ───
    await prisma.member.update({
      where: { id },
      data: { isActive: false },
    });
    
    res.status(200).json({ 
      success: true, 
      message: 'Member deactivated successfully.' 
    });
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
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields.' 
      });
    }

    // ─── Check if fellowship exists ───
    const fellowship = await prisma.fellowship.findUnique({
      where: { id: fellowshipId }
    });

    if (!fellowship) {
      return res.status(400).json({
        success: false,
        message: 'Fellowship does not exist. Please select a valid fellowship.'
      });
    }

    // ─── Check if member exists and belongs to the fellowship ───
    const member = await prisma.member.findFirst({
      where: { 
        id: memberId,
        fellowshipId: fellowshipId,
        isActive: true
      }
    });

    if (!member) {
      return res.status(400).json({
        success: false,
        message: 'Member does not exist or does not belong to this fellowship.'
      });
    }

    // ─── Find or create session ───
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

    // ─── Upsert record ───
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

    res.status(200).json({ 
      success: true, 
      message: 'Attendance corrected successfully.', 
      data: record 
    });
  } catch (error) {
    console.error('Correct attendance error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to correct attendance.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};